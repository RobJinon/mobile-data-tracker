import React from 'react';

function OutputFields({ data }) {

    // These are the contents of {data}
    var origData = data["original-data"];
    var origDataUnit = data["original-data-unit"];
    var currData = data["current-data"];
    var currDataUnit = data["current-data-unit"];

    var startDate = data["start-date"];
    var currDate = data["current-date"];
    var endDate = data["end-date"];

    // Today's date as default value of date pickers (date input field)
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;

    // If no submitted inputs yets, sets a default value for the input fields
    if (!data) {
        origData = 0;
        currData = 0;
        origDataUnit = "GB";
        currDataUnit = "GB";
        startDate = today;
        currDate = today;
        endDate = today;
    }

    // Total amount of data consumed
    let consumedData = origData - currData;

    // Gets the number of days between two dates
    function timeDifference(endDate, startDate) {
        // Calculating the time difference of two dates (end-date and start-date)
        let differenceInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
        // Calculating the no. of days between two dates
        let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }

    // Total number of days the data should last
    let totalDays = timeDifference(endDate, startDate);
    // Remaining number of days until the date the data should last
    let remainingDays = timeDifference(endDate, currDate);

    // The remaining data if the user is on track with their data consumption
    let expectedRemainingData = () => {
        // If the remaining data is NaN (usually due to totalDays being equal to 0 due to absence of input), return 0 by default
        if (isNaN((remainingDays / totalDays) * origData)) {
            return 0
        // If the remaining data is not NaN, return the computed remaining data
        } else {
            return ((remainingDays / totalDays) * origData);
        }
    };

    // The remaining data regardless if the user is on track or not with their data consumption
    let actualRemainingData = origData - consumedData;

    // The amount of data that the user is ahead or behind
    // If the value is positive, the user is ahead, if the value is negative, the user is behind
    let aheadOrBehindData = (actualRemainingData - expectedRemainingData()).toFixed(2);

    // The original amount of data that can only be consumed in 1 day
    let origDailyConsumable = () => {
        // If origDailyConsumable is NaN (usually due to remainingDays being equal to 0 due to absence of input), return 0 by default
        if (isNaN(origData / totalDays)) {
            return 0
        // If the origDailyConsumable is not NaN, return the computed value
        } else {
            return (origData / totalDays).toFixed(2);
        }
    };

    // The updated amount of data that can be consumed 1 in 1 day
    // This may increase or decrease based on whether the user is behind or ahead of their data consumption
    let newDailyConsumable = () => {
        // If newDailyConsumable is NaN (usually due to remainingDays being equal to 0 due to absence of input), return 0 by default
        if (isNaN(currData / remainingDays)) {
            return 0
        // If the origDailyConsumable is not NaN, return the computed value
        } else {
            return (currData / remainingDays).toFixed(2);
        }
    };

    // Sets the textual message/output based on different conditions
    // Says "You are [ahead by]" when aheadOrBehindData is positive (ahead)
    // Says "You are [behind by]" when aheadOrBehindData is negative (behind)
    // Says "You are [on track]" when aheadOrBehindData is 0 or the default value (0)
    let isAheadOrBehind = "";
    let daysToStopSpending = 0;
    if (aheadOrBehindData >= 0) {
        isAheadOrBehind = "ahead by";
    } else if (aheadOrBehindData < 0) {
        isAheadOrBehind = "behind by";
        daysToStopSpending = Math.round(Math.abs(aheadOrBehindData) / origDailyConsumable());
    } else {
        isAheadOrBehind = "on track. Great!";
    }

    // Creates a dynamic image that changes based on different conditions
    const selectReactionImage = () => {
        if (aheadOrBehindData > 0) {
            return (<img id="reaction-image" src="asset/positive-gif.gif"/>);
        } else if (aheadOrBehindData < 0) {
            return (<img id="reaction-image" src="asset/negative-gif.gif"/>);
        } else {
            return (<img id="reaction-image" src="asset/neutral-gif.gif"/>);
        }
    }

    return (
        <div className='flex flex-col lg:flex-row bg-[#C5C5C5] p-6 rounded-md gap-y-8 lg:gap-x-10'>
            <div className='flex flex-row justify-between gap-x-4 lg:w-[65%]'>
                <div className='image-container w-[35%] lg:w-[30%]'>
                    {selectReactionImage()}
                </div>
                <div className='flex flex-col gap-y-4 w-[65%] text-start leading-tight'>
                    <div className='flex flex-col justify-start items-start'>
                        <p>You are {`${isAheadOrBehind}`}</p>
                        <h2 className='text-2xl text-primary font-bold'>{`${Math.abs(aheadOrBehindData)} ${currDataUnit}`}</h2>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <p>To maintain original daily consumable, stop spending for</p>
                        <h2 className='text-2xl text-primary font-bold'>{`${daysToStopSpending} days`}</h2>
                    </div>
                </div>
            </div>

            <div className='flex flex-row lg:flex-col justify-between gap-x-3 lg:w-[35%]'>

                <div className='flex flex-col lg:flex-row gap-y-3 bg-base-200 w-[50%] lg:w-full lg:h-[48%] p-3 lg:py-1 rounded-md lg:justify-between'>
                    <p className='text-primary leading-tight lg:text-start lg:w-[60%] lg:self-center'>Original Daily Consumable</p>
                    <div className='lg:flex lg:flex-row lg:items-center'>
                        <h1 className='text-primary text-4xl font-extrabold'>{`${origDailyConsumable()}`}</h1>
                        <p className='text-primary'>{`${origDataUnit}`}</p>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-y-3 bg-primary w-[50%] lg:w-full lg:h-[48%] p-3 lg:py-1 rounded-md lg:justify-between'>
                    <p className='text-white leading-tight lg:text-start lg:w-[60%] lg:self-center'>New Daily Consumable</p>
                    <div className='lg:flex lg:flex-row lg:items-center'>
                        <h1 className='text-accent text-4xl font-extrabold'>{`${newDailyConsumable()}`}</h1>
                        <p className='text-white'>{`${currDataUnit}`}</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default OutputFields;