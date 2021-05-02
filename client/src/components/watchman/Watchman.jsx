import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Table} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import './watchman.css'
import EmployeeItem from './employeeItem/employeeItem';

const Watchman = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    var employees = [{id: "1", firstName: "fedor", lastName: "nikolaev"}, {id: "2", firstName: "petr", lastName: "andreevich"}, {id: "3", firstName: "nikita", lastName: "ivanov"}];
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
            <tbody>
            {employees.map(
                employee =>
                <EmployeeItem employee = {employee}/>
            )}
        </tbody>
    </Table>
    </div>
    </label>
        
    );
};
export default Watchman;

