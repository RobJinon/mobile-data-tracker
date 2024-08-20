import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

function EditIspModal({ isp, refreshISPList }) {
    // Initialize state with ISP name
    const [newIspName, setNewIspName] = useState(isp ? isp.name : '');

    useEffect(() => {
        // Update state if ISP prop changes
        if (isp) {
            setNewIspName(isp.name);
        }
    }, [isp]);

    const handleChange = (e) => {
        setNewIspName(e.target.value);
    };

    const handleOkButton = async () => {
        const ispRef = doc(db, 'isps', isp.id);

        try {
            await updateDoc(ispRef, {
                ispName: newIspName
            });

            
            console.log('ISP name changed successfully.');
            document.getElementById('edit_isp_modal').close();

            if (refreshISPList){
                refreshISPList();
            }
        } catch (error) {
            console.error('Error updating ISP:', error);
        }
    };

    return (
        <dialog id="edit_isp_modal" className="modal">
            <div className="modal-box w-5/6 flex flex-col gap-3 lg:w-full">
                <h3 className="font-bold text-xl text-center">EDIT ISP</h3>

                <label className="form-control px-5 w-full mt-5">
                    <div className="label">
                        <span className="label-text">Enter a new name for your ISP</span>
                    </div>
                    <input
                        id='isp_name'
                        type="text"
                        placeholder="ISP Name"
                        className={`input input-bordered w-full`}
                        value={newIspName}
                        onChange={handleChange}
                    />
                    {/* {errors.ispName && <span className="text-error">{errors.ispName}</span>} */}
                </label>

                <div className="flex flex-col w-full my-4 mt-2 gap-2 p-5">
                    <button className='btn btn-primary text-white w-full' onClick={handleOkButton}>OK</button>
                    <button className='btn bg-base-300 w-full' onClick={() => document.getElementById('edit_isp_modal').close()}>CANCEL</button>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={() => document.getElementById('edit_isp_modal').close()}>close</button>
            </form>
        </dialog>
    );
}

export default EditIspModal;
