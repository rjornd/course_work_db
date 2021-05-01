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
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td><Button>Выдать ключ</Button></td>
        </tr>
    );
};
export default EmployeeItem;