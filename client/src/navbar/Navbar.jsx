import React, { useState } from 'react';
import './navbar.css'

import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import {Button, Nav} from 'react-bootstrap'

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    return (
        
        <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
    {!isAuth && <div className="navbar__login"><Nav.Link href="/login">Войти</Nav.Link></div>}
    {!isAuth && <div className="navbar__registration"><Nav.Link href="/registration">Регистрация</Nav.Link></div>}
    {isAuth && <Button onClick={()=> dispatch(logout())} variant="outline-primary">Выход</Button>}
    </Nav>
  </Navbar>
                
            
    );
};

export default Navbar;
