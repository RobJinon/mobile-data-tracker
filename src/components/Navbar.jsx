import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Navbar({ onActiveISPChange, ispList, activeISP, editISP, deleteISP }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    
    const handleThemeChange = () => {
        setTheme(theme === 'light_mode' ? 'dark_mode' : 'light_mode')
    }

    useEffect(() => {
        console.log('Theme: ', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleLogout = () => {
        auth.signOut().catch((error) => {
            console.error('Error signing out:', error);
          });  
        
        console.log('User logged out');
        navigate('/');
              
    }

    // get the currently logged in user's UID and store it at the uid state
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    });

    const user = auth.currentUser;
    return (
        <div className="navbar bg-primary text-white h-1/8 pr-20">
            <div className="flex-none  lg:hidden">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost text-slate-100 md:hidden">
                    <MenuIcon />
                </label>
            </div>
            <div className="flex lg:justify-start lg:flex-1">
                <a className="btn btn-ghost text-xl">MOBILE DATA TRACKER</a>
            </div>
            <div className="hidden lg:block lg:flex gap-4 px-5">
                {
                
                    theme === 'light_mode'?
                    <a className='btn btn-ghost' onClick={handleThemeChange}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>
                    </a>
                    :
                    <a className='btn btn-ghost' onClick={handleThemeChange}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>
                    </a>
                }

                <a className='btn bg-red-500 border-0 text-white' onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    Logout
                </a>
                
            </div>
            <Sidebar onActiveISPChange={onActiveISPChange} ispList={ispList} activeISP={activeISP} editISP={editISP} deleteISP={deleteISP} handleLogout={handleLogout}/>
        </div>
    );
}

export default Navbar;