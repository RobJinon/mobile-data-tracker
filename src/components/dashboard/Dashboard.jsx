import React from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import InputFields from './InputFields';

import ProgressBar from './ProgressBar';
import OutputFields from './OutputFields';


function Dashboard(props) {

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

    // // THESE ARE THE CONTENTS OF {data}
    // const startDate = data["start-date"];
    // const currDate = data["current-date"];
    // const endDate = data["end-date"];

    // const origData = data["original-data"];
    // const origDataUnit = data["original-data-unit"];
    // const currData = data["current-data"];
    // const currDataUnit = data["current-data-unit"];

    return (
        <div className='p-8 rounded-lg bg-base-200 w-11/12 lg:w-[80%] min-h-fit max-h-fit self-center'>
            <div className='flex flex-col gap-y-6 text-center'>
                <h1 className='text-2xl font-bold'>Welcome!</h1>

                {/* The setData function (which sets a value to the data variable) was passed to the InputFields component. In InputFields.jsx (child), the InputFields component would then pass its data to the setData function (i.e., onInput(formJson)) which would set the value of the data variable in the Dashboard.jsx (parent). This is a "Child to Parent" passing of data. See: https://dev.to/andydziabo/how-to-pass-data-between-sibling-components-in-react-2cjg*/}
                <InputFields onInput={setData}></InputFields>

                <ProgressBar data={data}></ProgressBar>
                <OutputFields data={data}></OutputFields>
            </div>
        </div>      
    );
}

export default Dashboard;