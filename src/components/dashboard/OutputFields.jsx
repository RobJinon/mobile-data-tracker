import React from 'react';

function OutputFields() {
    return (
        <div className='flex flex-col lg:flex-row bg-[#C5C5C5] p-6 rounded-md gap-y-8 lg:gap-x-10'>
            <div className='flex flex-row justify-between gap-x-4 lg:w-[65%]'>
                <div className='w-[35%] lg:w-[30%]'>
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

            <div className='flex flex-row lg:flex-col justify-between gap-x-3 lg:w-[35%]'>

                <div className='flex flex-col lg:flex-row gap-y-3 bg-base-200 w-[50%] lg:w-full lg:h-[48%] p-3 lg:py-1 rounded-md lg:justify-between'>
                    <p className='text-primary leading-tight lg:text-start lg:w-[60%] lg:self-center'>Original Daily Consumable</p>
                    <div className='lg:flex lg:flex-row lg:items-center'>
                        <h1 className='text-primary text-4xl font-extrabold'>1.61</h1>
                        <p className='text-primary'>GB</p>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-y-3 bg-primary w-[50%] lg:w-full lg:h-[48%] p-3 lg:py-1 rounded-md lg:justify-between'>
                    <p className='text-white leading-tight lg:text-start lg:w-[60%] lg:self-center'>New Daily Consumable</p>
                    <div className='lg:flex lg:flex-row lg:items-center'>
                        <h1 className='text-accent text-4xl font-extrabold'>2.75</h1>
                        <p className='text-white'>GB</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default OutputFields;