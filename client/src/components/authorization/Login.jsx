import React, {useState} from 'react';
import './authorization.css'
import Input from "../../utils/input/Input";
import {useDispatch} from 'react-redux'
import {login} from '../../actions/user';

const Login = () => {
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <div className='authorization'>
            <div className="authorization__header">Авторизация</div>
            <Input value={nickname} setValue={setNickname} type="text" placeholder="Введите nickname..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={()=> dispatch(login(nickname,password))}>Войти</button>
        </div>
    );
};

export default Login;
