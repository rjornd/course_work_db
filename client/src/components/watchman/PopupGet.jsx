import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../utils/input/Input';
import {useState} from 'react'
import {useRef} from 'react'
import { setPopupGetDisplay } from '../../reducers/employeeReducer';
import { Button, Table } from 'react-bootstrap';
import CabinetList from './employeeItem/cabinetItem/cabinetlist';
import { addAvCabinet } from '../../actions/employees';
import './watchman.css'
const PopupGet = () =>{
    const [cabinet, setCabinet] = useState('')
    const popupDisplay = useSelector(state => state.employees.popupGetDisplay)
    const selectedEmployee = useSelector(state => state.employees.selectedEmployee)
    const dispatch = useDispatch()

    function createHandler(childRef) 
    {
        dispatch(addAvCabinet(selectedEmployee, cabinet))
        childRef.current.HandleClear();
    }

    function clickHandle(event)
    {
        
        event.stopPropagation()
        event.preventDefault()
    }


    const childRef = useRef();
    return(
        <div className = 'popup' onClick ={(e)=> clickHandle(e) } style = {{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => clickHandle(event))}>
                <div className="popup__header">
                    <div className="popup__title">Сотрудник: {selectedEmployee?.first_name + " " + selectedEmployee?.last_name}</div>
                    <Button className="popup__close" onClick ={()=> dispatch(setPopupGetDisplay('none'))} variant="outline-primary">X</Button>
                </div>
                <div className="table-wrapper">
                <Table responsive striped bordered hover size="sm" onClick={e => e.preventDefault()}>
                <thead>
                    <tr>
                        <th>Доступные кабинеты</th>
                    </tr>
                </thead>
                <CabinetList/>
                
                </Table>
                </div>
                <Input ref = {childRef} type ="text" placeholder = "Добавить доступный кабинет" value={cabinet} setValue={setCabinet}/>
                <Button className="popup__create" onClick={() => createHandler(childRef)}>Добавить</Button>
            </div>
        </div>
    );
};

export default PopupGet;