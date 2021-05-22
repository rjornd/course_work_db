import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Row} from 'react-bootstrap';

import './watchman.css'
import { setPopupGetDisplay, setPopupTakeDisplay, setSelectedEmployee, setPopupChangeDisplay } from '../../../reducers/employeeReducer';
import { delEmployee, getCabs, getKeys } from '../../../actions/employees';
const EmployeeItem = ({employee}, key) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    function giveKeyHandle(e)
    {
        dispatch(setSelectedEmployee(employee))
        dispatch(getCabs(employee))
        dispatch(setPopupGetDisplay('flex'))
    }
    function takeKeyHandle(e)
    {
        dispatch(setSelectedEmployee(employee))
        dispatch(getKeys(employee))
        dispatch(setPopupTakeDisplay('flex'))
    }
    function delEmployeeHandle(e)
    {
        dispatch(delEmployee(employee.emplid))
    }
    function changeHandle(e)
    {
        dispatch(setSelectedEmployee(employee))
        dispatch(setPopupChangeDisplay('flex'))
    }
    return (
        <tr key={key}>
            <td>{employee.emplid}</td>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td><Button onClick = {(e) => giveKeyHandle(e)}>Выдать ключ</Button></td>
            <td><Button variant="warning" onClick = {(e) => takeKeyHandle(e)}>Принять ключ</Button></td>
            <td><Button variant="warning" onClick = {(e) => changeHandle(e)}>Изменить</Button></td>
            <td><Button variant="danger" onClick = {(e) => delEmployeeHandle(e)}>X</Button></td>
        </tr>
    );
};
export default EmployeeItem;