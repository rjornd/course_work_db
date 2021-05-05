import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Table} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import './watchman.css'
import EmployeeItem from './employeeItem/employeeItem';
import { getEmployees } from '../../actions/employees';
import EmployeeList from './employeeItem/employeelist';
import PopupGet from './PopupGet';
import PopupTake from './PopupTake';
const Watchman = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    
    useEffect(() => {
      dispatch(getEmployees())
    }, [currentUser] )
    return ( 
        
        <label onClick={e => e.preventDefault()}>
            <div>
            Привет, {currentUser.first_name + " " + currentUser.last_name}
        </div>
        <label>
        <InputGroup className="mb-3" onClick={e => e.preventDefault()}>
        <InputGroup.Prepend>
          <InputGroup.Text>Фамилия</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl />
        <InputGroup.Prepend>
          <InputGroup.Text>Имя</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl />
        <Button>Выборка</Button>
      </InputGroup>
      </label>
        <div >
        <Table striped bordered size="sm" onClick={e => e.preventDefault()}>
            <thead>
                <tr>
                <th>id</th>
                <th>Имя</th>
                <th>Фамилия</th>
                </tr>
            </thead>
            <EmployeeList/>
    </Table>
    <PopupGet/>
    <PopupTake/>
    </div>
    </label>
        
    );
};
export default Watchman;

