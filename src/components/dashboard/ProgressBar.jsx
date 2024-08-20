import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';

function ProgressBar({ activeISP }) {

    const [origData, setOrigData] = useState(0);
    const [origDataUnit, setOrigDataUnit] = useState("");
    const [currData, setCurrData] = useState(0);
    const [currDataUnit, setCurrDataUnit] = useState("");
    const user = auth.currentUser;

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const toggleIsDataLoaded = () => {
        if (currData) {
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
            const q = query(collection(db, 'isps'), where('id', '==', user.uid), where('ispName', '==', activeISP))

            // const querySnapshot = await getDocs(q);

            // Using onSnapshot method you can "listen" to a document. An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot. TL;DR: it updates the data on the DOM without refreshing (Source: https://firebase.google.com/docs/firestore/query-data/listen)
            const foo = onSnapshot(q, (querySnapshot) => {
                const fetchedISPs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                if (fetchedISPs.length > 0) {
                    setOrigData(fetchedISPs[0].origData);
                    setOrigDataUnit(fetchedISPs[0].origDataUnit);
                    setCurrData(fetchedISPs[0].currData);
                    setCurrDataUnit(fetchedISPs[0].currDataUnit);
                    console.log("Successfully fetched data and displayed on the progress bar. The displayed is");
                    console.table(fetchedISPs);
                }
            });

            return () => foo();
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    };

    useEffect(() => {
        fetchData(user);
    }, [activeISP], user.uid);
    
    const currConverted = convertFromMB(convertToMB(currData, currDataUnit));
    const origConverted = convertFromMB(convertToMB(origData, origDataUnit));

    return (
        <div className={`${isDataLoaded ? 'visible' : 'skeleton'} flex flex-row gap-x-2 items-center w-full lg:w-[90%] h-[10%] bg-[#C5C5C5] p-4 lg:py-2 rounded-md`}>
            <progress className={`${isDataLoaded ? 'visible' : 'hidden'} progress progress-primary w-[70%]`} value={convertToMB(currData, currDataUnit)} max={convertToMB(origData, origDataUnit)}></progress>
            <div className={`${isDataLoaded ? 'visible' : 'hidden'} flex flex-col items-end w-[30%] leading-none`}>
                <h2 className='text-xl text-primary font-bold leading-none'>{`${(Number(currConverted.value)).toFixed(2)} ${currConverted.unit || "GB"}`}</h2>
                <p>{`${(Number(origConverted.value)).toFixed(2)} ${origConverted.unit || "GB"}`}</p>
            </div>
        </div>
    );
}

export default ProgressBar;