import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Table} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import './watchman.css'
import EmployeeItem from './employeeItem/employeeItem';
import { getEmployees } from '../../actions/employees';
import EmployeeList from './employeeItem/employeelist';
const Watchman = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    
    useEffect(() => {
      dispatch(getEmployees())
    }, [currentUser] )
    return ( 
        
        <label>
            <div>
            Привет, {currentUser.first_name + " " + currentUser.last_name}
        </div>
        <label>
        <InputGroup className="mb-3">
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
        <div className = "wrap">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
                </tr>
            </thead>
            <EmployeeList/>
    </Table>
    </div>
    </label>
        
    );
};
export default Watchman;

