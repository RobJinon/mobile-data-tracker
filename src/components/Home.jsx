import React from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';

function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <Dashboard></Dashboard>
        </div>
    );
}

export default Home;