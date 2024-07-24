import React from 'react';

import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { Box, alpha, styled } from '@mui/material';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledInput = styled(OutlinedInput, {
    shouldForwardProp: (prop) => prop !== 'success',
  })(({ success, theme }) => ({
    width: 300,
    ...(success && {
      color: theme.palette.success.main,
      '& .MuiSlider-thumb': {
        [`&:hover, &.Mui-focusVisible`]: {
          boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
        },
        [`&.Mui-active`]: {
          boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
        },
      },
    }),
  }));

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
        
        if (errors === 0){
            signupWithUsernameAndPassword(e);
        }
        
    };

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
                        Sign Up
                    </Typography>
                    
                    <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
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
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type='password'
                            placeholder='Password'
                            startAdornment={
                            <InputAdornment position="start">
                                <PasswordIcon />
                            </InputAdornment>
                            }
                            label="Password"
                            onChange = { (e) => setPassword(e.target.value)}
                            
                    />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirm-password"
                            type='password'
                            placeholder='Confirm Password'
                            startAdornment={
                            <InputAdornment position="start">
                                <PasswordIcon />
                            </InputAdornment>
                            }
                            label="Confirm Password"
                            onChange = { (e) => setConfirmPassword(e.target.value) }
                            
                    />
                    </FormControl>

                    <Button     
                            type='submit' 
                            variant='contained' 
                            sx={{width: '100%', mt: 3}} 
                            onClick = {(e) => validateForm(e)}>
                                Signup
                    </Button>

                    <Link to = "../" style={{width:'100%'}}>
                        <Button     
                            type='submit' 
                            variant='contained'
                            sx={{width: '100%', mt: 1, background: 'lightgray', color: '#1f1f1f', '&:hover': {background: '#9e9e9e', color: 'white'}}}>
                                Cancel
                        </Button>
                    </Link>
                        
                </Paper>
            </Box>
        </>
    );
}

export default Signup;