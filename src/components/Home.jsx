import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';
import IspList from './ispList/IspList';
import AddIspModal from './AddIspModal';
import EditIspModal from './EditIspModal';
import DeleteIspModal from './DeleteIspModal';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';

function Home() {
    const [ispList, setIspList] = useState([]);
    const [activeISP, setActiveISP] = useState("");
    const [editISP, setEditISP] = useState("");
    const [deleteISP, setDeleteISP] = useState("");
    const [addISP, setAddISP] = useState("");
    const user = auth.currentUser;

    const fetchISPs = async (user) => {
        try {
            const q = query(collection(db, 'isps'), where('id', '==', user.uid))
    
            const querySnapshot = await getDocs(q);
            const fetchedISPs = querySnapshot.docs.map(doc => ({
                ispID: doc.id,
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
            console.error("Error setting the default active ISP.");
        }
    });
    
    
    const handleActiveISP = (ispName) => {
        setActiveISP(ispName);
    }
    
    const handleEditISP = (ispName, ispID) => {
        setEditISP({name: ispName, id: ispID});
    }

    const handleDeleteISP = (ispName, ispID) => {
        setDeleteISP({name: ispName, id: ispID});
    }

    const handleAddISP = (ispName) => {
        setAddISP(ispName);
    }
    
    const refreshIspList = () => {
        fetchISPs(user);
        setActiveISP(ispList[0].ispName)
    }

    return (
        <div className='flex flex-col items-center w-screen min-h-screen max-h-screen'>

            <Navbar onActiveISPChange={handleActiveISP}  ispList={ispList} activeISP={activeISP} editISP={handleEditISP} deleteISP={handleDeleteISP}/>

            <div className="flex lg:w-4/5 h-[90%] px-4 lg:px-0 justify-center gap-5 items-center">

                <div className='rounded-lg w-1/3 h-[95%] bg-base-200 hidden lg:block md:block'>
                    <IspList onActiveISPChange={handleActiveISP} ispList={ispList} activeISP={activeISP} editISP={handleEditISP} deleteISP={handleDeleteISP}/>
                </div>

                <Dashboard activeISP={activeISP} ispList={ispList}/>

            </div>
            
            <AddIspModal ispList={ispList} refreshISPList={refreshIspList}/>
            <EditIspModal isp={editISP} refreshISPList={refreshIspList}/>
            <DeleteIspModal isp={deleteISP} refreshISPList={refreshIspList}/>
        </div>
    );
}

export default Home;