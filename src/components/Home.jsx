import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';
import IspList from './ispList/IspList';
import AddIspModal from './AddIspModal';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';

function Home() {
    const [ispList, setIspList] = useState([]);
    const [activeISP, setActiveISP] = useState(null);
    const user = auth.currentUser;

    const fetchISPs = async (user) => {
        try {
            const q = query(collection(db, 'isps'), where('id', '==', user.uid))
    
            const querySnapshot = await getDocs(q);
            const fetchedISPs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setIspList(fetchedISPs);
        }
        catch (error) {
            console.error("Error fetching ISPs: ", error)
        }

    }

    useEffect(() => {
        fetchISPs(user);
    }, []);

    // sets a default active ISP
    useEffect(() => {
        try {
            if (!activeISP) {
                setActiveISP(ispList[0].ispName);
                console.log("Successfully set the default active ISP.");
            }
        } catch (error) {
            console.error("Error setting the default active ISP: " + error);
        }
    });
    

    const handleActiveISP = (ispName) => {
        setActiveISP(ispName);
    }

    return (
        <div className='w-screen min-h-screen flex flex-col'>

            <Navbar onActiveISPChange={handleActiveISP}  ispList={ispList} activeISP={activeISP}/>

            <div className="flex w-full justify-center">

                <div className="flex flex-row justify-center gap-5 lg:w-4/5">

                    <div className='rounded-lg w-[20%] bg-base-200 h-full hidden lg:block'>
                        <IspList onActiveISPChange={handleActiveISP} ispList={ispList} activeISP={activeISP}/>
                    </div>

                    <Dashboard activeISP={activeISP} ispList={ispList}/>

                </div>
            </div>
            
            <AddIspModal />
        </div>
    );
}

export default Home;