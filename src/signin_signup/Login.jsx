import React from 'react';

import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import Paper from '@mui/material/Paper';
import PasswordIcon from '@mui/icons-material/Password';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >   
                <Paper 
                    elevation={3}
                    sx={{
                            p: 10,
                            pt: 5, 
                            width: '20%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }}
                >

                    <Typography variant="h3" display="block" sx={{mb: 3}} gutterBottom>
                        Sign In
                    </Typography>
                    
                    <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='text'
                            placeholder='Email'
                            startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                            }
                            label="Email"
                            onChange = { (e) => setEmail(e.target.value) }
                    />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='password'
                            placeholder='Password'
                            startAdornment={
                            <InputAdornment position="start">
                                <PasswordIcon />
                            </InputAdornment>
                            }
                            label="Password"
                            onChange={ (e) => setPassword(e.target.value) }
                    />
                    </FormControl>

                    <Button 
                            onClick = {loginWithUsernameAndPassword}
                            type='submit' 
                            variant='contained' 
                            sx={{width: '100%', mt: 3}}>
                                Login
                    </Button>

                    <Typography variant="body2" display="block" sx={{mt: 2}} gutterBottom>
                        Dont have an account? <Link to = "./signup">Sign up.</Link>
                    </Typography>
                        
                </Paper>
            </Box>
        </>
    );
}

export default Login;