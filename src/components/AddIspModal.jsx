import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function AddIspModal({ ispList, refreshISPList }) {
    const today = new Date().toISOString().split('T')[0];

    const [uid, setUid] = useState("");

    const [ispName, setIspName] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [origData, setOrigData] = useState(0);
    const [origDataUnit, setOrigDataUnit] = useState("GB");
    const [errors, setErrors] = useState({});
    const [ispExists, setIspExists] = useState(false);

    // checks the form for input errors
    const validateForm = () => {
        const newErrors = {};
        if (!ispName) newErrors.ispName = "ISP name is required";
        if (!startDate) newErrors.startDate = "Start date is required";
        if (!endDate) newErrors.endDate = "End date is required";
        if (!origData) newErrors.origData = "Amount is required";
        if (origData <= 0) newErrors.origData = "Amount must be greater than 0";
        return newErrors;
    };

    // Checks if the new ISP already exists in the list of ISPs
    const isOnISPList = (ispName) => {
        const exists = ispList.some(isp => isp.ispName === ispName);
        setIspExists(exists);
    }

    // get the currently logged in user's UID and store it at the uid state
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                console.log("No user currently signed in.");
            }
        });
    }), [];

    useEffect(() => {
        if (ispName) {
            isOnISPList(ispName);
        }
    }, [ispName]);

    // Clears the form if 'Cancel' button is clicked or ISP is added successfully
    const clearForm = () => {
        setIspName('');
        setStartDate(today);
        setEndDate(today);
        setOrigData(0);
        setOrigDataUnit('GB');
        setErrors({})
    }

    // Stores data to firestore if there are no validation errors
    const sendToFirestore = async() => {
        const auth = getAuth();
        const user = auth.currentUser;

        const validationErrors = validateForm;
        setErrors(validationErrors);

        if (user && Object.keys(validationErrors).length === 0 && !ispExists) {
            await addDoc( collection(db, "isps"), {
                id: uid,
                ispName: ispName,
                startDate: startDate,
                currDate: today,
                endDate: endDate,
                origData: origData,
                origDataUnit: origDataUnit,
                currData: 0,
                currDataUnit: origDataUnit
            });
            console.log("Successfully stored the data of User " + uid + " on Firestore.");

            if (refreshISPList){
                refreshISPList();
            }

            clearForm();
            setIspExists(false);
            document.getElementById('add_isp_modal').close()
        };
    };



    return (
        <dialog id="add_isp_modal" className="modal">
            <div className="modal-box w-5/6 flex flex-col gap-3 lg:w-full">
                <h3 className="font-bold text-xl text-center">ADD ISP</h3>

                <label className="form-control px-5 w-full mt-5 max-w-xs">
                    <div className="label">
                        <span className="label-text">Internet Service Provider {"("}ISP{")"}</span>
                    </div>
                    <input
                        id='isp_name'
                        type="text"
                        placeholder="ISP Name"
                        className={`input input-bordered w-full max-w-xs ${errors.ispName || ispExists ? 'input-error' : ''}`}
                        value={ispName}
                        onChange={e => setIspName(e.target.value)}
                        maxLength='10'
                    />
                    {errors.ispName && <span className="text-error">{errors.ispName}</span>}
                    {ispExists ? <span className="text-error">ISP already exists</span>:<></>}
                </label>

                <label className="form-control px-5 w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">When did you start consuming data?</span>
                    </div>
                    <input
                        id='date_start'
                        type="date"
                        className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                    {errors.startDate && <span className="text-error">{errors.startDate}</span>}
                </label>

                <label className="form-control px-5 w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Until when do you want your data to last?</span>
                    </div>
                    <input
                        id='date_end'
                        type="date"
                        className={`input input-bordered w-full ${errors.endDate ? 'input-error' : ''}`}
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                    {errors.endDate && <span className="text-error">{errors.endDate}</span>}
                </label>

                <label className="form-control px-5 w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">How much data do you initially have?</span>
                    </div>
                    <div className='join'>
                        <input
                            id='amount'
                            type="number"
                            className={`input input-bordered w-1/4 join-item ${errors.origData ? 'input-error' : ''}`}
                            value={origData}
                            onChange={e => setOrigData(e.target.value)}
                        />
                        <select
                            id='amount_unit'
                            className='select select-bordered bg-base-300 join-item'
                            value={origDataUnit}
                            onChange={e => setOrigDataUnit(e.target.value)}
                        >
                            <option value="TB">TB</option>
                            <option value="GB">GB</option>
                            <option value="MB">MB</option>
                        </select>
                    </div>
                    {errors.origData && <span className="text-error">{errors.origData}</span>}
                </label>

                <div className="flex flex-col w-full my-4 gap-2 p-5">
                    <button className='btn btn-primary text-white w-full' onClick={sendToFirestore}>BEGIN TRACKING MY DATA</button>
                    <form method='dialog' className='flex flex-col w-full gap-2 '>
                        <button className='btn bg-base-300 w-full' onClick={clearForm}>CANCEL</button>
                    </form>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button >close</button>
            </form>
        </dialog>
    );
}

export default AddIspModal;
