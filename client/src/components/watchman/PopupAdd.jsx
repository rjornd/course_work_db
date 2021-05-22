import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../utils/input/Input';
import {useState} from 'react'
import {useRef} from 'react'
import { setPopupAddDisplay } from '../../reducers/employeeReducer';
import { Button } from 'react-bootstrap';
import './watchman.css'
import { addNewEmployee } from '../../actions/employees';
const PopupAdd = () =>{
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const popupDisplay = useSelector(state => state.employees.popupAddDisplay)
    const dispatch = useDispatch()

    function createHandler(childRef1, childRef2) 
    {
        dispatch(addNewEmployee(first_name, last_name))
        childRef1.current.HandleClear();
        childRef2.current.HandleClear();
        dispatch(setPopupAddDisplay('none'))
    }

    function clickHandle(event)
    {
        
        event.stopPropagation()
        event.preventDefault()
    }


    const childRef1 = useRef();
    const childRef2 = useRef();
    return(
        <div className = 'popup' onClick ={(e)=> clickHandle(e) } style = {{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => clickHandle(event))}>
                <div className="popup__header">
                    <div className="popup__title">Сотрудник</div>
                    <Button className="popup__close" onClick ={()=> dispatch(setPopupAddDisplay('none'))} variant="outline-primary">X</Button>
                </div>
                
                <Input ref = {childRef1} type ="text" placeholder = "Имя" value={first_name} setValue={setFirstName}/>
                <Input ref = {childRef2} type ="text" placeholder = "Фамилия" value={last_name} setValue={setLastName}/>
                <Button className="popup__create" onClick={() => createHandler(childRef1, childRef2)}>Добавить</Button>
            </div>
        </div>
    );
};

export default PopupAdd;