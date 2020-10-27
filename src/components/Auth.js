import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Auth.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../redux/userReducer'

const Auth = (props) => {
    const [toggle, setToggle] = useState(true)
    const [usernameInput, SetUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

   const usernameInputHandler = (e) => {
        SetUsernameInput(e.target.value)
   }

   const passwordInputHandler = (e) => {
       setPasswordInput(e.target.value)
   } 

   const login = () => {
       axios.post('/auth/login',
       {username: usernameInput, password: passwordInput})
       .then(res => {
           props.getUser()
           props.history.push('/')
       }).catch(err => console.log('Please enter a valid usersname or password'))
   }

   const register = () => {
       axios.post('/auth/register',
       {username: usernameInput, password: passwordInput})
       .then(res => {
           props.getUser()
           props.history.push('/')
       }).catch(err => 'username already exists')
   }
    return (
        <div className="auth">
            <h1>{toggle? "Login" : "Register"}</h1>
            <form className="authForm">
            <input name='username' placeholder='username' value={usernameInput} onChange={usernameInputHandler}/>
            <input name='password' placeholder='password' value={passwordInput} type='password' onChange={passwordInputHandler}/>
            </form>
            {toggle ? (
                <div>
                    <button className='loginButton' onClick={login}>Login</button>
                    <button className='switchButton' onClick={() => {
                        setToggle(!toggle)
                    }}>Need to Signup?</button>
                </div>
            ) : (
                <div className='buttonContainer'>
                    <button className='loginButton' onClick={register}>Register</button>
                    <button className='switchButton' onClick={() => {
                        setToggle(!toggle)
                    }}>already have an account?</button>
                </div>
            )}
        </div> 
    )
}

export default connect(null, {getUser})(Auth)