import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <div className="navbar bg-[#14213D] text-white mb-10 pr-20">
            <div class="flex-none  lg:hidden">
                <button class="btn btn-square btn-ghost text-slate-100">
                    <MenuIcon />
                </button>
            </div>
            <div className="flex lg:justify-start lg:flex-1">
                <a className="btn btn-ghost text-xl">MOBILE DATA TRACKER</a>
            </div>
            <div class="hidden lg:block lg:flex gap-4 px-5">
                <a className="btn btn-ghost text-slate-100">
                    Register
                </a>
                <Link to='/login'>
                    <a className='btn bg-white text-slate-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-slate-700' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                        Login
                    </a>
                </Link>
                
            </div>
        </div>
    );
}

export default Navbar;