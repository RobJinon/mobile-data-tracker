import React from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';

function Home() {
    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <Navbar></Navbar>
            <Dashboard></Dashboard>
        </div>
    );
}

export default Home;