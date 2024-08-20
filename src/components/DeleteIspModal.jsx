import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

function DeleteIspModal({ isp, refreshISPList }) {

    const handleDelete = async () => {
        const ispRef = doc(db, 'isps', isp.id);

        try {
            await deleteDoc(ispRef);

            console.log(isp.name, 'deleted successfully.');
            document.getElementById('delete_isp_modal').close();

            if (refreshISPList){
                refreshISPList();
            }
        }

        catch (error) {
            console.error('Error deleting ISP:', error);
        }
    }

    return (
        <dialog id="delete_isp_modal" className="modal">
            <div className="modal-box w-5/6 flex flex-col gap-3 lg:w-full">
                <h3 className="font-bold text-xl text-center">Are you sure you want to delete {isp ? isp.name: ''}?</h3>

                <div className="flex flex-col w-full my-4 mt-2 gap-2 p-5">
                    <button className='btn bg-red-500 text-white w-full' onClick={handleDelete}>YES</button>
                    <button className='btn bg-base-300 w-full' onClick={() => document.getElementById('delete_isp_modal').close()}>CANCEL</button>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={() => document.getElementById('delete_isp_modal').close()}>close</button>
            </form>
        </dialog>
    );
}

export default DeleteIspModal;
