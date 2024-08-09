import React from 'react';

function IspList({ onActiveISPChange, ispList, activeISP }) {

    const handleISPBtn = (ispID) => {
        onActiveISPChange(ispID);
    }

    return (
        <div>

            <div className='flex flex-col w-full items-center gap-2 justify-items-center justify-center lg:hidden'>
                <li className='text-white navbar bg-primary'>
                        <a className="btn btn-ghost  p-0 text-xl">My ISPs</a>
                </li>
            
                {ispList.map((isp) => (
                    <li className='w-full px-3'><a id={isp.ispName} className={`btn w-full ${activeISP === isp.ispName ? 'btn-active' :' btn-primary'}`} onClick={()=>handleISPBtn(isp.ispName)}>{isp.ispName}</a></li>
                ))}
                <li className='w-full px-3'>
                    <a className='btn btn-ghost' onClick={()=>document.getElementById('add_isp_modal').showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-accent' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                        Add ISP
                    </a>
                </li>
            </div>

            <div className='flex flex-col w-full hidden lg:block'>
                <div className='flex flex-col items-center w-full gap-4'>
                    <div className='text-center w-full bg-primary py-4 text-xl text-white rounded-t-lg font-bold mb-3'>My ISPs</div>

                    {ispList.map((isp) => (
                        <div className='w-5/6 px-3'><a id={isp.ispName} className={`btn w-full ${activeISP === isp.ispName ? 'btn-active' :' btn-primary'}`} onClick={()=>handleISPBtn(isp.ispName)}>{isp.ispName}</a></div>
                    ))}

                    <div className='w-5/6 px-3'>
                        <a className='btn btn-ghost w-full' onClick={()=>document.getElementById('add_isp_modal').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-accent' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            Add ISP
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IspList;