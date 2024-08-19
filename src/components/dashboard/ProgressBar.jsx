import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';

function ProgressBar({ activeISP }) {

    const [origData, setOrigData] = useState("");
    const [origDataUnit, setOrigDataUnit] = useState("");
    const [currData, setCurrData] = useState("");
    const [currDataUnit, setCurrDataUnit] = useState("");
    const user = auth.currentUser;

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

            // const fetchedISPs = querySnapshot.docs.map(doc => ({
            //     id: doc.id,
            //     ...doc.data()
            // }));
            return () => foo();
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    };

    useEffect(() => {
        fetchData(user);
    }, [activeISP], user.uid);

    return (
        <div className='flex flex-row gap-x-2 items-center w-full lg:w-[90%] h-[10%] bg-[#C5C5C5] p-4 lg:py-2 rounded-md'>
            <progress className="progress progress-primary w-[70%]" value={currData} max={origData}></progress>
            <div className='flex flex-col items-end w-[30%] leading-none'>
                <h2 className='text-xl text-primary font-bold leading-none'>{`${(Number(currData)).toFixed(2)} ${currDataUnit}`}</h2>
                <p>{`${(Number(origData)).toFixed(2)} ${origDataUnit}`}</p>
            </div>
        </div>
    );
}

export default ProgressBar;