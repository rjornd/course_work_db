import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../utils/input/Input';
import {useState} from 'react'
import {useRef} from 'react'
import { setPopupChangeDisplay } from '../../reducers/employeeReducer';
import { Button } from 'react-bootstrap';
import './watchman.css'
import { updateEmployee } from '../../actions/employees';
const PopupChange = () => {
    const popupDisplay = useSelector(state => state.employees.popupChangeDisplay)
    const selectedEmployee = useSelector(state => state.employees.selectedEmployee)
    const dispatch = useDispatch()
    console.log(selectedEmployee)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    
    useEffect(
        () => {
            setFirstName(`${selectedEmployee?.first_name}`)
            setLastName(`${selectedEmployee?.last_name}`)
        }, [selectedEmployee]
    )
    
    function createHandler(childRef1, childRef2)
    {
        const employee = {
            emplid: selectedEmployee.emplid,
            first_name: first_name,
            last_name: last_name
        }
        dispatch(updateEmployee(employee))
        childRef1.current.HandleClear();
        childRef2.current.HandleClear();
        dispatch(setPopupChangeDisplay('none'))
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
                    <Button className="popup__close" onClick ={()=> dispatch(setPopupChangeDisplay('none'))} variant="outline-primary">X</Button>
                </div>
                
                <Input ref = {childRef1} type ="text" placeholder={"Имя"} value={first_name} setValue={setFirstName}/>
                <Input ref = {childRef2} type ="text" placeholder={"Фамилия"} value={last_name} setValue={setLastName}/>
                <Button className="popup__create" onClick={() => createHandler(childRef1, childRef2)}>Изменить</Button>
            </div>
        </div>
    );
};

export default PopupChange;