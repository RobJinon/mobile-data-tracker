import React from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';

import Navbar from '../navbar/Navbar';


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
        <div className = "w-screen min-h-screen">
            <Navbar />
            <div className="card bg-slate-100 text-gray-600 w-full shadow-xl">
                <div className='card-body text-center'>
                    <h1>This is the dashboard</h1>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div> 
    );
}

export default Dashboard;