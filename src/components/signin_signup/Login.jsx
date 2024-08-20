import React from 'react';

import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const [errors, setErrors] = useState({});

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        }

        catch {
            setNotice("Wrong username or password");
        }
    }


    const validateForm = () => {
        setErrors({});
        const formErrors = {}

        if (!email) {
            formErrors.email = 'Enter an email'
        }
        if (!password) {
            formErrors.password = 'Enter a password'
        }

        setNotice(null);

        return formErrors;
    }

    return (
        <div className="card bg-base-100 w-3/4 lg:w-1/3 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl my-5">Login</h2>

                <div className='flex flex-col gap-2'>
                    <label className="form-control mt-5">
                        <label className={`input input-bordered flex items-center gap-2 ${errors.email ? 'input-error animate-shake' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-[#14213D]' height="24px" viewBox="0 -960 960 960" width="24px"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                            <input type="email" className="grow" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        </label>
                        {errors.email && 
                            <div className="label">
                                <span className="text-error label-text-alt">
                                    {errors.email}
                                </span>
                            </div>
                        }
                    </label>

                    <label className="form-control">
                        <label className={`input input-bordered flex items-center gap-2 border ${errors.password ? 'input-error animate-shake' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-[#14213D]' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/></svg>
                            <input 
                                type="password" 
                                className="grow" 
                                placeholder='Password' 
                                onChange={e => setPassword(e.target.value)}  />
                        </label>

                        {errors.password && 
                            <div className="label">
                                <span className="text-error label-text-alt">
                                    {errors.password}
                                </span>
                            </div>
                        }
                    </label>

                    <button className="btn mt-3 bg-[#14213D] rounded text-white" onClick={loginWithUsernameAndPassword}>Login</button>

                    {/* <Link to='/' >
                        <button className="btn btn-sm bg-[#E5E5E5] w-full rounded text-slate-700">Back</button>
                    </Link> */}

                    <div className='divider'></div>

                    <div className="flex flex-col lg:flex-row">
                        <p>Don't have an account?</p>
                        <Link to='/signup'><a className='link link-primary mx-1'>Sign up here.</a></Link>
                    </div>

                </div>
            </div>

            <div className={`${notice ? 'toast animate-shake' : 'hidden'}`}>
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <span className='text-white'>{notice}</span>
                </div>
            </div>
        </div>
    );
}

export default Login;