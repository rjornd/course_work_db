import React, {useState} from 'react';
import './authorization.css'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [user_login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={first_name} setValue={setFirstName} type="text" placeholder="Введите имя..."/>
            <Input value={last_name} setValue={setLastName} type="text" placeholder="Введите фамилию..."/>
            <Input value={user_login} setValue={setLogin} type="text" placeholder="Введите login..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={() => registration(first_name, last_name,user_login, password)}>Зарегистрироваться</button>
        </div>
    );
};

export default Registration;
