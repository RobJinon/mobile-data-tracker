import React from 'react';

function ProgressBar() {
    return (
        <div className='flex flex-row gap-x-2 items-center w-full h-[30%] bg-[#C5C5C5] p-4 rounded-md'>
            <progress className="progress progress-primary w-[70%]" value="70" max="100"></progress>
            <div className='flex flex-col items-end w-[30%] leading-none'>
                <h2 className='text-2xl text-primary font-bold'>35 GB</h2>
                <p>50 GB</p>
            </div>
        </div>
    );
}

export default ProgressBar;