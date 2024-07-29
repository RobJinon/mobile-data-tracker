import React from 'react';

function ProgressBar({ data }) {

    const origData = data["original-data"];
    const origDataUnit = data["original-data-unit"];
    const currData = data["current-data"];
    const currDataUnit = data["current-data-unit"];

    return (
        <div className='flex flex-row gap-x-2 items-center w-full h-[30%] bg-[#C5C5C5] p-4 lg:py-2 rounded-md'>
            <progress className="progress progress-primary w-[70%]" value={currData} max={origData}></progress>
            <div className='flex flex-col items-end w-[30%] leading-none'>
                <h2 className='text-2xl text-primary font-bold leading-none'>{`${currData} ${currDataUnit}`}</h2>
                <p>{`${origData} ${origDataUnit}`}</p>
            </div>
        </div>
    );
}

export default ProgressBar;