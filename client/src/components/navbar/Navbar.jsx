import React, { useState } from 'react';
import './navbar.css'
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { Button} from 'react-bootstrap'
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    
   
    return (
        <div className="navbar">
            <div className="container">
            <NavLink to ='/'><div className="navbar__header">АС Вахтера</div></NavLink>
                {isAuth && <NavLink to ='/'><div className="navbar__header">Сотрудники</div></NavLink>}
                {isAuth && <NavLink to ='/keys'><div className="navbar__header">Ключи</div></NavLink>}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <Button onClick={()=> dispatch(logout())} variant="outline-primary">Выход</Button>}
            </div>
        </div>
    );
};

export default Navbar;
