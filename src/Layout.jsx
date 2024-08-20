import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout(props) {
    return (
        <div className = "flex flex-col w-screen h-screen items-center">
            <Outlet />
        </div>
    );
}

export default Layout;