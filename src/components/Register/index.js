import React, { useState, useEffect } from 'react'
import { RegisterContainer, RegisterFormWrapper, NameInput, UsernameInput, PasswordInput, RegisterButton } from "./RegisterComponents";

import { register } from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = "/"

    const history = useHistory()

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(register(name, username, password))
    }

    return (
        <RegisterContainer>
            { loading && <h2>Loading...</h2>}
            {error && <h2>Error: {error.message}</h2>}
            <RegisterFormWrapper onSubmit={submitHandler}>
                <h1>Sign Up</h1>
                <NameInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <UsernameInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <PasswordInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                <RegisterButton type="submit">Register</RegisterButton>
            </RegisterFormWrapper>
        </RegisterContainer>
    )
}

export default Register
