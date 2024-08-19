import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Navbar({ onActiveISPChange, ispList, activeISP, editISP }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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
        <div className="navbar bg-[#14213D] text-white mb-10 pr-20">
            <div className="flex-none  lg:hidden">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost text-slate-100">
                    <MenuIcon />
                </label>
            </div>
            <div className="flex lg:justify-start lg:flex-1">
                <a className="btn btn-ghost text-xl">MOBILE DATA TRACKER</a>
            </div>
            <div className="hidden lg:block lg:flex gap-4 px-5">
                { !isLoggedIn ? <>
                    <Link to='/signup'>
                        <a className="btn btn-ghost text-slate-100">
                            Register
                        </a>
                    </Link>
                    <Link to='/login'>
                        <a className='btn bg-white text-slate-700'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-slate-700' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                            Login
                        </a>
                    </Link>
                    </> 
                    :
                    <a className='btn bg-red-500 border-0 text-white' onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                        Logout
                    </a>
                }
                
            </div>
            <Sidebar onActiveISPChange={onActiveISPChange} ispList={ispList} activeISP={activeISP} editISP={editISP} handleLogout={handleLogout}/>
        </div>
    );
}

export default Navbar;