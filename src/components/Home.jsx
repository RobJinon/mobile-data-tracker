import React, { useState } from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';
import IspList from './ispList/IspList';
import AddIspModal from './AddIspModal';
import { auth } from '../firebase';

function Home() {
    const [activeISP, setActiveISP] = useState(null);

    const handleActiveISP = (ispName) => {
        setActiveISP(ispName);
    }

    console.log('Active ISP:', activeISP);

    console.log('User: ', auth.currentUser);

    return (
        <div className='w-screen min-h-screen flex flex-col'>

            <Navbar />

            <div className="flex w-full justify-center">

                <div className="flex flex-row justify-center gap-5 lg:w-4/5">

                    <div className='rounded-lg w-[20%] bg-base-200 h-full hidden lg:block'>
                        <IspList onActiveISPChange={handleActiveISP}/>
                    </div>

                    <Dashboard />

                </div>
            </div>
            
            <AddIspModal />
        </div>
    );
}

export default Home;