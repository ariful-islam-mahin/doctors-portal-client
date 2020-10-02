import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../Main/Main';
import firebaseConfig from './firebase.config'
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = useContext(UserContext);

    const [newUser, setNewUser] = useState(true);

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        let isFormValid = true;
        const password = e.target.name === 'password'
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(password){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFormValid = isPasswordValid && passwordHasNumber
        }
        if(isFormValid){
            const newUserInfo = {...user};
           
            newUserInfo[e.target.name] = e.target.value;
            console.log(newUserInfo,'sdf');
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
                storeAuthToken()
                history.replace(from);
            })
            .catch(function(error) {
                // Handle Errors here.
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user, name:res.user.displayName};
                newUserInfo.error = '';
                newUserInfo.success = true
                setUser(newUserInfo);
                storeAuthToken()
                history.replace(from);
            })
            .catch(function(error) {
                // Handle Errors here.
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
              });
        }

        e.preventDefault()
    }

    const updateUserName = name => {
        console.log('user name',name);
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name
        })
        .then(function(res) {
            console.log('user name updated successfully', res)
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken)
        })
        .catch(function(error) {
        // Handle error
        });
    }

    return (
        <div style={{width:'300px'}} className='mx-auto mt-5'>
            <h3 className='text-center'>Login</h3>
            <form className='mt-2' onSubmit={handleSubmit}>
                {
                    newUser && 
                    <TextField className='form-control my-2' type="text" onBlur={handleBlur} name='name' placeholder='Name' required/>
                }
                <br/>
                <TextField className='form-control my-2' type="email" onBlur={handleBlur} name='email' placeholder='Email' required/>
                <br/>
                <TextField className='form-control my-2' type="password" onBlur={handleBlur} name='password' placeholder='Password' required/>
                <br/>
                <Button className='form-control my-2' type="submit" variant="contained" color="primary" >{newUser ? 'Sign up' : 'Sign in'}</Button>
                </form>
                <p onClick={() => setNewUser(!newUser)} className='text-danger' style={{cursor:'pointer'}}>{newUser ? 'Already have an account' : 'Create an account'}</p>
                {
                    user.success ? <p style={{color:'green'}}>User {newUser ? 'created' : 'logged in'} successfully</p> : <p style={{color:'red'}}>{user.error}</p>
                }
                {/* <TextField className='form-control my-2' name="name" id="filled-size-small" size="small" placeholder="Your Name"variant="outlined" required/>
                <TextField className='form-control my-2' name="email" id="filled-size-small" size="small" placeholder="Your Email"variant="outlined" required/>
                <Button className='form-control my-2' type='submit' variant="contained" color="primary">Sign in</Button> */}
        </div>
    );
};

export default Login;