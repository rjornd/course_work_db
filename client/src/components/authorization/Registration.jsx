import React, {useState} from 'react';
import './authorization.css'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={nickname} setValue={setNickname} type="text" placeholder="Введите nickname..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={() => registration(nickname, password)}>Зарегистрироваться</button>
        </div>
    );
};

export default Registration;
