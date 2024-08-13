import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function ProgressBar({ activeISP }) {

    const [origData, setOrigData] = useState();
    const [origDataUnit, setOrigDataUnit] = useState();
    const [currData, setCurrData] = useState();
    const [currDataUnit, setCurrDataUnit] = useState();
    const user = auth.currentUser;

    const fetchData = async(user) => {
        try {
            const q = query(collection(db, 'isps'), where('id', '==', user.uid), where('ispName', '==', activeISP))

            const querySnapshot = await getDocs(q);
            const fetchedISPs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrigData(fetchedISPs[0].origData);
            setOrigDataUnit(fetchedISPs[0].origDataUnit);
            setCurrData(fetchedISPs[0].currData);
            setCurrDataUnit(fetchedISPs[0].currDataUnit);
            console.log("Successfully fetched data and displayed on the progress bar.")
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    };

    useEffect(() => {
        fetchData(user);
    }, [activeISP]);

    return (
        <div className='flex flex-row gap-x-2 items-center w-full h-[30%] bg-[#C5C5C5] p-4 lg:py-2 rounded-md'>
            <progress className="progress progress-primary w-[70%]" value={currData} max={origData}></progress>
            <div className='flex flex-col items-end w-[30%] leading-none'>
                <h2 className='text-xl text-primary font-bold leading-none'>{`${(Number(currData)).toFixed(2)} ${currDataUnit}`}</h2>
                <p>{`${(Number(origData)).toFixed(2)} ${origDataUnit}`}</p>
            </div>
        </div>
    );
}

export default ProgressBar;