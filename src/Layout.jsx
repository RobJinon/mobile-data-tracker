import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout(props) {
    return (
        <div className = "flex flex-col w-screen min-h-screen items-center justify-center">
            <div className = "flex flex-col items-center justify-center w-1/3">
                {/* <div className = "p-5">
                    <p className = "text-4xl">Firebase Authentication Test</p>
                </div> */}
                
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;