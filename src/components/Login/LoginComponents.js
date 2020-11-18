import styled from 'styled-components'

export const LoginContainer = styled.div`
    position: relative;
    height: 90vh;
`

export const LoginFormWrapper = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 15px;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    text-align: center;
    background: black;
    color: white;

    @media screen and (max-width: 768px){
        border: none;
    }
`
export const UsernameInput = styled.input`
    border-radius: 50px;
    padding: 10px 20px;
    outline: none;
`
export const PasswordInput = styled.input`
    border-radius: 50px;
    padding: 10px 20px;
    outline: none;
`
export const LoginButton = styled.button`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`
