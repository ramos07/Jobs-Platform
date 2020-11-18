import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SideBtnWrap, SidebarLink ,SidebarRoute, SidebarWrapper, SidebarMenu } from "./SidebarElements";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../actions/userActions";

const Sidebar = ({ isOpen, toggle }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/" onClick={toggle}>
                        Home
                    </SidebarLink>
                    <SidebarLink to="/jobs" onClick={toggle}>
                        Jobs
                    </SidebarLink>
                    {
                        userInfo ? (
                            null
                        ) : (
                            <SidebarLink to="/signup" onClick={toggle}>
                                Sign Up
                            </SidebarLink>
                        )
                    }
                </SidebarMenu>
                <SideBtnWrap>
                    {
                        userInfo ? (
                            <SidebarRoute to="/" onClick={logoutHandler}>Log Out</SidebarRoute>
                        ) : (
                            <SidebarRoute to="/login" onClick={toggle}>Sign In</SidebarRoute>
                        )
                    }
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
