import React from 'react';

import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';

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
        <div className = "w-3/4 p-5">
            <div className="card bg-slate-100 text-gray-600 w-full shadow-xl">
                {user.displayName == null?
                    <div className="card-body flex flex-col items-center justify-center">
                        <h2 className="card-title text-2xl text-center mb-5">Tell us your name</h2>
                        <form>
                            <input className='input' type='text' placeholder='Name' onChange={ (e) => setName(e.target.value)}></input>
                        </form>
                        <button type='submit' className='btn btn-primary text-white mt-5' onClick={setDisplayName}>Next</button>
                    </div>:
                
                    <div className="card-body flex flex-col items-center justify-center">
                        <h2 className="card-title">Welcome!</h2>
                        <p className='text-center'>You are { user.displayName }</p>
                        <div className="card-actions justify-center my-5">
                            <button className="btn btn-primary" onClick={logoutUser}>Logout</button>
                        </div>
                    </div>
                }
            </div>
        </div> 
    );
}

export default Dashboard;