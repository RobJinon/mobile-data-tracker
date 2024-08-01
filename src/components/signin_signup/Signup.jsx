import React from 'react';

import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Signup(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");
    
    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        if (password == confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/");
            }

            catch {
                setNotice("Sorry, something went wrong. Please try again.");
            }
        }
        
        else {
            setNotice("Passwords don't match. Please try again.");
        }
    }

    const validateForm = (e) => {
        e.preventDefault();

        let errors = 0;

        if (email.len === 0 || email === null || email === ''){
            console.log("Enter a valid email");
            errors += 1;
        }
        if (password.len === 0 || password === null || password === ''){
            console.log("Enter a password.");
            errors += 1;
        }
        if (confirmPassword.len === 0 || confirmPassword === null || password === ''){
            console.log("Enter a password.");
            errors += 1;
        }
        if (password !== confirmPassword) {
            console.log("Passwords don't match.");
        }
        
        if (errors === 0){
            signupWithUsernameAndPassword(e);
        }
        
    };

    return (
        <div className="card bg-base-100 w-3/4 lg:w-1/3 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl my-5">Signup</h2>

                <div className='flex flex-col gap-2'>
                    <label className="input input-bordered flex items-center gap-2 mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-[#14213D]' height="24px" viewBox="0 -960 960 960" width="24px"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                        <input type="email" className="grow" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 border">
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-[#14213D]' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/></svg>
                        <input type="password" className="grow" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mb-3 border">
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-[#14213D]' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/></svg>
                        <input type="password" className="grow" placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} />
                    </label>

                    <button className="btn btn-sm bg-[#14213D] rounded text-white" onClick={validateForm}>Signup</button>

                    <Link to='/' >
                        <button className="btn btn-sm bg-[#E5E5E5] w-full rounded text-slate-700">Cancel</button>
                    </Link>

                    <div className='divider'></div>

                    <div className="flex flex-col lg:flex-row">
                        <p>Already have an account?</p>
                        <Link to='/login'><a className='link link-primary mx-1'>Sign in here.</a></Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signup;