import React from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';
import AddIspModal from './AddIspModal';
import { useAuth } from '../firebase';

function Home() {

    const { currentUser } = useAuth();
    // console.log('User id: ' + currentUser.uid)
    console.log(currentUser)

    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <Navbar />
            <Dashboard />
            <AddIspModal />
        </div>
    );
}

export default Home;