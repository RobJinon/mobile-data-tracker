import React from 'react';

import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("./profile");
        }

        catch {
            setNotice("You entered a wrong username or password");
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(googleProvider);
            navigate("./profile");
        }

        catch (error) {
            // setNotice();
            console.log(error);
        }
    }

    return (
        <div className='card w-full'> 
            <h1>Login</h1>
            <Link to='/signup'>Signup</Link>
            <Link to='/'>Back</Link>
        </div>
    );
}

export default Login;