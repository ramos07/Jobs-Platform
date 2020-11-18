import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const HeroContainer = styled.div`
    height: 89vh;
    position: relative;
`

export const BgImage = styled.div`
    position: absolute;
    background: url("https://images.unsplash.com/photo-1503423571797-2d2bb372094a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
`
export const HeroContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
export const HeroSlogan = styled.h1`
    color: white;
    font-size: 2.5rem;
`

export const HeroBtn = styled.button`
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    padding: 2rem 0
`
export const HeroBtnLink = styled(Link)`
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