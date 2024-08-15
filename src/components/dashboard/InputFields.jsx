import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

function MobileDataInput({ id, name, numValue, setNumValue, unitValue, setUnitValue }) {

    // dynamically changes the default selected option of the select input field
    useEffect(() => {
        const selectElement = document.getElementById(`${id}-unit`);
        const newValue = unitValue;
        selectElement.value = newValue;
    });
    
    return (
        <div className='flex flex-col gap-y-1 lg:w-[32%]'>
            <div className="flex flex-row justify-start h-[40%]">
                <label htmlFor={id}>{name}</label>
            </div>
            <div className="join flex flex-col gap-y-1 w-full h-[60%]">
                <div className="flex flex-row justify-start h-[60%]">
                    <input
                        type="number"
                        step="any"
                        value={numValue}
                        onChange={(e) => setNumValue(e.target.value)}
                        name={id}
                        id={id}
                        className="input input-sm bg-white border-primary rounded join-item w-full placeholder-transparent::placeholder"
                        placeholder="Amount"
                    />
                    <select
                        value={unitValue}
                        onChange={(e) => setUnitValue(e.target.value)}
                        name={`${id}-unit`}
                        className="select select-sm select-bordered bg-base-300 border-primary rounded join-item w-[55%] pl-1.5"
                        id={`${id}-unit`}
                    >
                        <option>TB</option>
                        <option>GB</option>
                        <option>MB</option>
                        <option>KB</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function DatePicker({ id, name, dateValue, setDateValue }) {
    return (
        <div className='flex flex-col justify-between gap-y-1.5 lg:w-[32%]'>
            <div className="flex flex-row justify-start h-[35%]">
                <label htmlFor={id}>{name}</label>
            </div>
            <div className="flex flex-col w-full h-[65%]">
                <input
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    name={id}
                    id={id}
                    className="bg-white border border-primary rounded py-0.5 px-1 w-full"/>
            </div>
        </div>
    );
}

function InputFields({ activeISP, ispList }) {

    const datePickers = [["start-date", "Start Date"], ["current-date", "Current Date"], ["end-date", "End Date"]];
    const numInputs = [["original-data", "Original Data"], ["current-data", "Current Data"]];

    const [dateValues, setDateValues] = useState([]);
    const [numValues, setNumValues] = useState([]);
    const [unitValues, setUnitValues] = useState([]);

    const generateDatePickers = (datePickers, dateValues) => {    
        let items = [];
        datePickers.map((datePicker, index) => (
            items.push(
                <DatePicker
                    name={datePicker[1]}
                    id={datePicker[0]}
                    dateValue={dateValues[index]}
                    setDateValue={(value) => {
                        const newValues = [...dateValues];
                        newValues[index] = value;
                        setDateValues(newValues);
                    }}
                    key={index}
                />)
        ));
        return items;
    };

    const generateNumInputs = (numInputs, numValues, unitDefaultValues) => {
        let items = [];
        numInputs.map((numInput, index) => (
            items.push(
                <MobileDataInput
                    name={numInput[1]}
                    id={numInput[0]}
                    numValue={numValues[index]}
                    setNumValue={(value) => {
                        const newValues = [...numValues];
                        newValues[index] = value;
                        setNumValues(newValues);
                    }}
                    unitValue={unitValues[index]}
                    setUnitValue={(value) => {
                        const newValues = [...unitValues];
                        newValues[index] = value;
                        setUnitValues(newValues);
                    }}
                    key={index}
                />)
        ));
        return items;
    };

    // retrives ISP data from Firestore and display them as default values of the input fields
    const loadInputDefaults = async(activeISP, ispList) => {
        try {
            if (activeISP) {
                const isp = ispList.find((isp) => isp.ispName === activeISP);
                console.table(isp);
                if (isp) {
                    setDateValues([isp.startDate, isp.currDate, isp.endDate]);
                    setNumValues([isp.origData, isp.currData]);
                    setUnitValues([isp.origDataUnit, isp.currDataUnit]);
                };
            };
            console.log("Successfully displayed document data as default values of input fields.");
        } catch (error) {
            console.error("Error displaying document data as default values of input fields: " + error);
        };
    };
    
    useEffect(() => {
        loadInputDefaults(activeISP, ispList);
    }, [activeISP]);

    // function to update the data of the user on Firestore
    const updateDocInFirestore = async(data) => {
        const user = auth.currentUser;

        // query to get the id of the active ISP (document) of the current logged in user
        const q = query(collection(db, "isps"), where("id", "==", user.uid), where("ispName", "==", activeISP));
        let docId = null;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docId = doc.id;
        });

        // the document owned by the current logged in user and active ISP
        const docRef = doc(db, "isps", docId);

        // updates the data of the document
        await updateDoc(docRef, {
            startDate: data["start-date"],
            currDate: data["current-date"],
            endDate: data["end-date"],
            origData: data["original-data"],
            origDataUnit: data["original-data-unit"],
            currData: data["current-data"],
            currDataUnit: data["current-data-unit"]
        });
    };

    function handleSubmit(e) {

        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        updateDocInFirestore(formJson);
    };

    return ( 
        <div className="flex flex-col gap-y-6">
            <form method="post" onSubmit={handleSubmit}>
                <div id="input-fields" className="flex flex-row lg:flex-col justify-between gap-x-0.5 lg:gap-y-5">
                    <div id="date-fields" className="flex flex-col lg:flex-row justify-items-start lg:justify-between gap-y-2 w-[47%] lg:w-full">
                        {generateDatePickers(datePickers, dateValues)}
                    </div>
                    <div id="mobile-data-fields" className="flex flex-col lg:flex-row justify-items-start lg:justify-between gap-y-2 w-[47%] lg:w-full">
                        {generateNumInputs(numInputs, numValues, unitValues)}
                        <div className='flex flex-col gap-y-1 justify-end lg:w-[32%]'>
                            <button type="submit" className="btn btn-sm bg-primary text-white w-full hidden lg:block lg:self-end lg:h-[55%]">COMPUTE MY DATA</button>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-wide bg-primary text-white w-full lg:hidden">COMPUTE MY DATA</button>
            </form>
        </div>
     );
}

export default InputFields;