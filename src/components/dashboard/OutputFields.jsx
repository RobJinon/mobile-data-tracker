import React from 'react';

function OutputFields() {
    return (
        <div className='flex flex-col bg-[#C5C5C5] p-6 rounded-md gap-y-8'>
            <div className='flex flex-row justify-between gap-x-4'>
                <div className='w-[35%]'>
                    <img src="asset/positive-gif.gif"/>
                </div>
                <div className='flex flex-col gap-y-4 w-[65%] text-start leading-tight'>
                    <div className='flex flex-col justify-start items-start'>
                        <p>You are ahead by</p>
                        <h2 className='text-2xl text-primary font-bold'>22 GB</h2>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <p>To maintain original daily consumable, stop spending for</p>
                        <h2 className='text-2xl text-primary font-bold'>0 days</h2>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-x-3 justify-between'>
                <div className='flex flex-col gap-y-3 bg-base-200 w-[50%] p-3 rounded-md'>
                    <p className='text-primary leading-tight'>Original Daily Consumable</p>
                    <div>
                        <h1 className='text-primary text-4xl font-extrabold'>1.61</h1>
                        <p className='text-primary'>GB</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-3 bg-primary w-[50%] p-3 rounded-md'>
                    <p className='text-white leading-tight'>New Daily Consumable</p>
                    <div>
                        <h1 className='text-accent text-4xl font-extrabold'>2.75</h1>
                        <p className='text-white'>GB</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OutputFields;