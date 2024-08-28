import React from 'react';

function IspList({ onActiveISPChange, ispList, activeISP, editISP, deleteISP }) {

    const theme = localStorage.getItem('theme')

    const handleISPBtn = (ispID) => {
        onActiveISPChange(ispID);
    }

    const handleEditISPBtn = (ispName, ispID) => {
        editISP(ispName, ispID);
        document.getElementById('edit_isp_modal').showModal();
    }

    const handleDeleteISPBtn = (ispName, ispID) => {
        deleteISP(ispName, ispID);
        document.getElementById('delete_isp_modal').showModal();
    }


    return (
        <div className='h-full'>

            <div className='flex flex-col w-full items-center gap-2 justify-items-center justify-center lg:hidden md:hidden'>
                <li className='text-white navbar bg-primary'>
                        <a className="btn btn-ghost  p-0 text-xl">My ISPs</a>
                </li>
            
                {ispList.map((isp, index) => (
                    <li className='w-full px-3' key={index}>
                        <div id={isp.ispName} className={`btn group w-full flex hover:justify-between  ${activeISP === isp.ispName ? 'btn-active' :' btn-primary'} ${theme === 'dark_mode' && activeISP === isp.ispName ? 'text-base-100' : ''} ${theme === 'light_mode' && activeISP === isp.ispName ? 'text-[#292524]' : ''}`} onClick={()=>handleISPBtn(isp.ispName, isp.id)}>
                                {isp.ispName}
                                
                                <a className='hidden group-hover:block' onClick={() => handleEditISPBtn(isp.ispName, isp.ispID)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`${activeISP === isp.ispName ? '' :' fill-slate-300'}`} height="18px" viewBox="0 -960 960 960" width="24px" ><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                </a>
                            </div>
                    </li>
                ))}
                <li className='w-full px-3'>
                    <a className='btn btn-ghost' onClick={()=>document.getElementById('add_isp_modal').showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-accent' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                        Add ISP
                    </a>
                </li>
            </div>

            <div className='w-full h-full hidden lg:flex lg:flex-col md:flex md:flex-col justify-stretch gap-2 items-center w-full h-full pb-3'>
                    <div className='text-center w-full bg-primary py-4 text-xl text-white rounded-t-lg font-bold'>My ISPs</div>
                    
                    <div className="flex flex-col items-center gap-2 w-full py-2 overflow-y-auto">
                        {ispList.map((isp, index) => (
                            <div className='w-5/6 px-1' key={index}>
                                <div id={isp.ispName} className={`btn group w-full flex flex-row px-2 hover:justify-between  ${activeISP === isp.ispName ? 'btn-active' :' btn-primary'} ${theme === 'dark_mode' && activeISP === isp.ispName ? 'text-base-100' : ''} ${theme === 'light_mode' && activeISP === isp.ispName ? 'text-[#292524]' : ''}`} onClick={()=>handleISPBtn(isp.ispName, isp.id)}>
                                    {isp.ispName}
                    
                                    <div className="flex flex-row hidden group-hover:flex">
                                        <a className='hidden group-hover:block' onClick={() => handleEditISPBtn(isp.ispName, isp.ispID)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`${activeISP === isp.ispName ? '' :' fill-slate-300'}`} height="18px" viewBox="0 -960 960 960" width="24px" ><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                        </a>
                                        <a className='hidden group-hover:block' onClick={() => handleDeleteISPBtn(isp.ispName, isp.ispID)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-red-500' height="18px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='divider m-0'></div>
 
                    <div className='w-5/6 px-1'>
                        <a className='btn btn-ghost w-full' onClick={()=>document.getElementById('add_isp_modal').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-accent' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            Add ISP
                        </a>
                    </div>
            </div>
        </div>
    );
}

export default IspList;