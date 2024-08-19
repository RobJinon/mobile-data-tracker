import React from 'react';
import { Link } from 'react-router-dom';
import IspList from './ispList/IspList';

function Sidebar({ onActiveISPChange, ispList, activeISP, editISP, deleteISP, handleLogout }) {
    return (
        <div className="drawer lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu flex flex-col p-0 justify-between bg-base-200 text-base-content min-h-full w-80">
                    {/* Sidebar top */}
                    <IspList onActiveISPChange={onActiveISPChange}  ispList={ispList} activeISP={activeISP} editISP={editISP} deleteISP={deleteISP}/>

                    {/* Sidebar bottom */}
                    <div className='flex flex-col w-full gap-2 p-3 items-center justify-center'>
                        {/* <li className='w-full'>
                            <Link to='/signup' className="btn btn-primary text-slate-100">
                                    Register
                            </Link>
                        </li>
                        <li className='w-full'>
                            <Link to='/login' className='btn bg-white text-slate-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='fill-slate-700' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                                Login
                            </Link>
                        </li> */}

                        <li className='w-full'>
                            <a className='btn bg-red-500 border-0 text-white' onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                                Logout
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;