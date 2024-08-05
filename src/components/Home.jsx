import React from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';
import AddIspModal from './AddIspModal';
import { auth } from '../firebase';

function Home() {

    console.log('User: ', auth.currentUser)

    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <Navbar />
            <Dashboard />
            <AddIspModal />
        </div>
    );
}

export default Home;