import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Row} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import './watchman.css'
const EmployeeItem = ({employee}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    return (
        <tr>
            <td>{employee.emplid}</td>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td><Button>Выдать ключ</Button></td>
        </tr>
    );
};
export default EmployeeItem;