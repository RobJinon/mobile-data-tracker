import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';

function OutputFields({ activeISP }) {

    const user = auth.currentUser;

    let [origData, setOrigData] = useState("");
    let [origDataUnit, setOrigDataUnit] = useState("");
    let [currData, setCurrData] = useState("");
    let [currDataUnit, setCurrDataUnit] = useState("");

    let [startDate, setStartDate] = useState("");
    let [currDate, setCurrDate] = useState("");
    let [endDate, setEndDate] = useState("");

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [fetchedISPs, setFetchedISPs] = useState("");

    const toggleIsDataLoaded = () => {
        if (fetchedISPs.length > 0) {
            setIsDataLoaded(true);
        } else {
            setIsDataLoaded(false);
        };
    };

    useEffect(() => {
        toggleIsDataLoaded();
    });

    const convertToMB = (value, unit) => {
        switch (unit) {
            case 'TB':
                return value * 1000 * 1000;
            case 'GB':
                return value * 1000;
            case 'MB':
                return value;
            default:
                return 0;
        }
    }

    const convertFromMB = (value) => {
        const numericValue = parseFloat(value); // Ensure value is a number
        if (isNaN(numericValue)) return { value: 0, unit: 'MB' };

        if (numericValue >= 1000000) {
            return { value: (numericValue / 1000000).toFixed(2), unit: 'TB' };
        } else if (numericValue >= 1000) {
            return { value: (numericValue / 1000).toFixed(2), unit: 'GB' };
        } else {
            return { value: numericValue.toFixed(2), unit: 'MB' };
        }
    };

    const fetchData = async(user) => {
        try {
            const q = query(collection(db, 'isps'), where('id', '==', user.uid), where('ispName', '==', activeISP));

            const foo = onSnapshot(q, (querySnapshot) => {
                const fetchedISPs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFetchedISPs(fetchedISPs);
                if (fetchedISPs.length > 0) {
                    setStartDate(fetchedISPs[0].startDate);
                    setCurrDate(fetchedISPs[0].currDate);
                    setEndDate(fetchedISPs[0].endDate);
                    setOrigData(convertToMB(fetchedISPs[0].origData, fetchedISPs[0].origDataUnit));
                    setOrigDataUnit('MB');
                    setCurrData(convertToMB(fetchedISPs[0].currData, fetchedISPs[0].currDataUnit));
                    setCurrDataUnit('MB');


                    console.log("Successfully fetched data to be computed and displayed on the output field. Starting computation...");
                    console.table(fetchedISPs);
                }
            });
            return () => foo();
        } catch (error) {
            console.error("Error fetching data: ", error);
        };
    };

    useEffect(() => {
        fetchData(user);
    }, [activeISP, user.uid]);


    // Total amount of data consumed
    let [consumedData, setConsumedData] = useState("");
    useEffect(() => {
        setConsumedData(origData - currData);
    });

    console.log("Do: " + origData);
    console.log("Dc: " + currData);
    console.log("Dx: " + consumedData);

    // Gets the number of days between two dates
    const timeDifference = (endDate, startDate) => {
        // Calculating the time difference of two dates (end-date and start-date)
        let differenceInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
        // Calculating the no. of days between two dates
        let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    // Total number of days the data should last
    let [totalDays, setTotalDays] = useState("");
    useEffect(() => {
        setTotalDays(timeDifference(endDate, startDate));
    });
    console.log("To: " + totalDays);

    // Remaining number of days until the date the data should last
    let [remainingDays, setRemainingDays] = useState("");
    useEffect(() => {
        setRemainingDays(timeDifference(endDate, currDate));
    });
    console.log("Tr: " + remainingDays);

    // The remaining data if the user is on track with their data consumption
    const expectedRemainingData = () => {
        // If the remaining data is NaN (usually due to totalDays being equal to 0 due to absence of input), return 0 by default
        if (isNaN((remainingDays / totalDays) * origData)) {
            console.log("De: " + 0);
            return 0;
        // If the remaining data is not NaN, return the computed remaining data
        } else {
            let expectedRemainingData = (remainingDays / totalDays) * origData;
            console.log("De: " + expectedRemainingData);
            return (expectedRemainingData);
        }
    };

    // The remaining data regardless if the user is on track or not with their data consumption
    let [actualRemainingData, setActualRemainingData] = useState("");
    useEffect(() => {
        setActualRemainingData(origData - consumedData);
    });
    console.log("Da: " + actualRemainingData);

    // The amount of data that the user is ahead or behind
    // If the value is positive, the user is ahead, if the value is negative, the user is behind
    let [aheadOrBehindData, setAheadOrBehindData] = useState("");
    useEffect(() => {
        setAheadOrBehindData((actualRemainingData - expectedRemainingData()).toFixed(2));
    });
    console.log("N: " +  aheadOrBehindData);


    // The original amount of data that can only be consumed in 1 day
    const origDailyConsumable = () => {
        // If origDailyConsumable is NaN (usually due to remainingDays being equal to 0 due to absence of input), return 0 by default
        if (isNaN(origData / totalDays)) {
            console.log("Ao: " + 0);
            return 0
        // If the origDailyConsumable is not NaN, return the computed value
        } else {
            let bar = (origData / totalDays).toFixed(2);
            console.log("Ao: " + bar);
            return bar;
        }
    };

    // The updated amount of data that can be consumed 1 in 1 day
    // This may increase or decrease based on whether the user is behind or ahead of their data consumption
    const newDailyConsumable = () => {
        // If newDailyConsumable is NaN (usually due to remainingDays being equal to 0 due to absence of input), return 0 by default
        if (isNaN(currData / remainingDays)) {
            console.log("An: " + 0);
            return 0
        // If the origDailyConsumable is not NaN, return the computed value
        } else {
            let bar = (currData / remainingDays).toFixed(2);
            console.log("An: " + bar);
            return bar;
        }
    };

    // Sets the textual message/output based on different conditions
    let [isAheadOrBehind, setIsAheadOrBehind] = useState("");
    let [daysToStopSpending, setDaysToStopSpending] = useState(0);

    useEffect(() => {
        if (aheadOrBehindData >= 0) {
            // Says "You are [ahead by]" when aheadOrBehindData is positive (ahead)
            setIsAheadOrBehind("ahead by");
            setDaysToStopSpending(0);
        } else if (aheadOrBehindData < 0) {
            // Says "You are [behind by]" when aheadOrBehindData is negative (behind)
            setIsAheadOrBehind("behind by");
            // Additionally says the no. of days to stop spending
            setDaysToStopSpending(Math.round(Math.abs(aheadOrBehindData) / origDailyConsumable()));
        } else {
            // Says "You are [on track]" when aheadOrBehindData is 0 or the default value (0)
            setIsAheadOrBehind("on track. Great!");
        }
    });

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
        <div className={`${isDataLoaded ? 'visible' : 'skeleton'} flex flex-col lg:flex-row lg:w-[90%] md:w-full lg:h-2/5 bg-[#C5C5C5] px-6 py-3 rounded-md gap-y-8 lg:gap-x-10`}>
            <div className={`flex flex-row justify-between items-center gap-x-4 lg:w-[65%]`}>
                <div className={`${isDataLoaded ? 'visible' : 'invisible'} image-container w-[35%] lg:w-[30%]`}>
                    {selectReactionImage()}
                </div>
                <div className={`flex flex-col gap-y-4 w-[65%] text-start leading-tight`}>
                    <div className={`${isDataLoaded ? 'visible' : 'invisible'} flex flex-col justify-start items-start`}>
                        <p className={`text-sm`}>You are {`${isAheadOrBehind}`}</p>
                        <h2 className='text-xl text-primary font-bold'>{`${convertFromMB(Math.abs(aheadOrBehindData)).value} ${convertFromMB(Math.abs(aheadOrBehindData)).unit}`}</h2>
                    </div>
                    <div className={`${isDataLoaded ? 'visible' : 'invisible'} flex flex-col justify-start items-start`}>
                        <p className='text-sm'>To maintain original daily consumable, stop spending for</p>
                        <h2 className='text-xl text-primary font-bold'>{`${daysToStopSpending} days`}</h2>
                    </div>
                </div>
            </div>

            <div className='flex flex-row lg:flex-col justify-between gap-x-3 lg:w-[45%] py-2'>

                <div className={`${isDataLoaded ? 'visible' : 'invisible'} flex flex-col lg:flex-row gap-y-3 bg-base-200 w-[50%] lg:w-full lg:h-[48%] p-3 lg:py-1 rounded-md lg:justify-between`}>
                    <p className={`text-primary text-sm md:text-xs leading-tight lg:text-start lg:w-[60%] lg:self-center`}>Original Daily Consumable</p>
                    <div className='lg:flex lg:flex-row lg:items-center'>
                        <h1 className='text-primary text-4xl font-extrabold'>{`${Number(convertFromMB(origDailyConsumable()).value).toFixed(2)}`}</h1>
                        <p className='ml-2 text-primary'>{`${convertFromMB(origDailyConsumable()).unit || "GB"}`}</p>
                    </div>
                </div>

                <div className={`${isDataLoaded ? 'visible' : 'invisible'} flex flex-col lg:flex-row gap-y-3 bg-primary w-[50%] lg:w-full lg:h-[48%] p-3 lg:py-1 rounded-md lg:justify-between`}>
                    <p className='text-white text-sm md:text-xs leading-tight lg:text-start lg:w-[60%] lg:self-center'>New Daily Consumable</p>
                    <div className='lg:flex lg:flex-row lg:items-center'>
                        <h1 className='text-accent text-4xl font-extrabold'>{`${Number(convertFromMB(newDailyConsumable()).value).toFixed(2)}`}</h1>
                        <p className='ml-2 text-white'>{`${convertFromMB(newDailyConsumable()).unit || "GB"}`}</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default OutputFields;