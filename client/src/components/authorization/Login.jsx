import React, {useState} from 'react';
import './authorization.css'
import Input from "../../utils/input/Input";
import {useDispatch} from 'react-redux'
import {login} from '../../actions/user';
import { getEmployees } from '../../actions/employees';

const Login = () => {
    const [user_login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    function click()
    {
        dispatch(login(user_login, password))
    }
    return (
        <div className='authorization'>
            <div className="authorization__header">Авторизация</div>
            <Input value={user_login} setValue={setLogin} type="text" placeholder="Введите login..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={()=> click()}>Войти</button>
        </div>
    );
};

export default Login;
