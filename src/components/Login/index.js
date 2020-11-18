import React, { useState, useEffect } from 'react'
import { LoginContainer, LoginFormWrapper, UsernameInput,  PasswordInput, LoginButton } from "./LoginComponents";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../../actions/userActions";

import { useHistory } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = window.location.search ? window.location.search.split('=')[1] : "/"

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(login(username, password))
    }

    return (
        <LoginContainer>
            { loading && <h2>Loading...</h2>}
            {error && <h2>Error: {error.message}</h2>}
            <LoginFormWrapper onSubmit={submitHandler}>
                <h1>Login</h1>
                <UsernameInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <PasswordInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                <LoginButton type="submit">Login</LoginButton>
            </LoginFormWrapper>
        </LoginContainer>
    )
}

export default Login
