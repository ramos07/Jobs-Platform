import React from 'react'
import { Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks, MobileIcon, NavBtn, NavBtnLink } from "./NavbarElements";
import { FaBars } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../actions/userActions";

const Navbar = ({ toggle }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/">
                        A Better Job
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="/">Home</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="/jobs">Jobs</NavLinks>
                        </NavItem>
                        {
                            userInfo ? (
                                null
                            ) : (
                                <NavItem>
                                    <NavLinks to="/signup">Sign Up</NavLinks>
                                </NavItem>
                            )
                        }
                    </NavMenu>
                    <NavBtn>
                        {
                            userInfo ? (
                                <NavBtnLink onClick={logoutHandler}>Logout</NavBtnLink>
                            ) : (
                                <NavBtnLink to="/login">Sign In</NavBtnLink>
                            )
                        }
                    </NavBtn>
                </NavbarContainer>
            </Nav>   
        </>
    )
}

export default Navbar
