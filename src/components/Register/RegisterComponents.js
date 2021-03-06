import styled from 'styled-components'

export const RegisterContainer = styled.div`
    position: relative;
    height: 90vh;
`

export const RegisterFormWrapper = styled.form`
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
    background: rgb(45,45,43);
    color: rgb(249, 249, 249);

    @media screen and (max-width: 768px){
        border: none;
    }
`
export const NameInput = styled.input`
    border-radius: 50px;
    padding: 10px 20px;
    outline: none;
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
export const RegisterButton = styled.button`
    border-radius: 50px;
    background: rgb(240, 228, 216);
    white-space: nowrap;
    padding: 10px 22px;
    color: rgb(45,45,43);
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: rgb(249, 249, 249);
        color: #010606;
    }
`
