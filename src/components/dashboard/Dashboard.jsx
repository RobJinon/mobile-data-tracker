import React from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import InputFields from './InputFields';

import Navbar from '../Navbar';
import ProgressBar from './ProgressBar';
import OutputFields from './OutputFields';
import IspList from '../ispList/IspList';


function Dashboard(props) {

    const navigate = useNavigate();
    const user = auth.currentUser;
    console.log(user);
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

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-row justify-center gap-5 lg:w-4/5">
                <div className='rounded-lg w-[20%] bg-base-200 h-full hidden lg:block'>
                    <IspList />
                </div>

                <div className='p-8 rounded-lg bg-base-200 w-11/12 lg:w-[80%] min-h-fit max-h-fit self-center'>
                    <div className='flex flex-col gap-y-6 text-center'>
                        <h1 className='text-2xl font-bold'>Welcome!</h1>
                        <InputFields></InputFields>
                        <ProgressBar></ProgressBar>
                        <OutputFields></OutputFields>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;