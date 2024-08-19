import React, { useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import InputFields from './InputFields';

import ProgressBar from './ProgressBar';
import OutputFields from './OutputFields';


function Dashboard({ activeISP, ispList }) {

    const navigate = useNavigate();
    const user = auth.currentUser;
    const [name, setName] = useState(null);

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    const setDisplayName = async (e) => {
        e.preventDefault();
        
        try{
            await updateProfile(
                user, {
                    displayName: name
                }
            ).then(() =>{
                console.log("Display name updated.");
                window.location.reload();
            })
        }

        catch{

        }
    }

    const [data, setData] = useState("");

    const getFromFirestore = async() => {
        const q = query(collection(db, "isps"), where("id", "==", user.uid), where("ispName", "==", activeISP));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log("Active ISP:", doc.data().ispName, " => ", doc.data());
        });
    };

    useEffect(() => {
        getFromFirestore();
    })

    return (
            <div className='rounded-lg px-5 bg-base-200 h-[95%]'>
                <div className='flex flex-col items-center gap-0 h-full px-2'>
                    <h1 className='text-3xl mt-5 mb-4 lg:mb-0 font-bold'>Welcome!</h1>

                    {/* The setData function (which sets a value to the data variable) was passed to the InputFields component. In InputFields.jsx (child), the InputFields component would then pass its data to the setData function (i.e., onInput(formJson)) which would set the value of the data variable in the Dashboard.jsx (parent). This is a "Child to Parent" passing of data. See: https://dev.to/andydziabo/how-to-pass-data-between-sibling-components-in-react-2cjg*/}

                    <div className="flex flex-col gap-3 lg:gap-0 justify-between pb-2 justify-center items-center w-full h-[90%] border">
                        <InputFields onInput={setData} activeISP={activeISP} ispList={ispList}></InputFields>
                        <ProgressBar activeISP={activeISP}></ProgressBar>
                        <OutputFields data={data}></OutputFields>
                    </div>
                </div>
            </div>  
    );
}

export default Dashboard;