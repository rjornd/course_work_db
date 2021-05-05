import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../utils/input/Input';
import {useState} from 'react'
import {useRef} from 'react'
import { setPopupTakeDisplay } from '../../reducers/employeeReducer';
import { Button, Table } from 'react-bootstrap';
import KeyList from './keyitem/keylist';
const PopupTake = () =>{
    const [cabinet, setCabinet] = useState('')
    const popupDisplay = useSelector(state => state.employees.popupTakeDisplay)
    const selectedEmployee = useSelector(state => state.employees.selectedEmployee)
    const dispatch = useDispatch()

    function createHandler(childRef) 
    {
        // выдать ключ dispatch(createDir(currentDir, dirName))
        dispatch(setPopupTakeDisplay('none'))
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
                    <Button className="popup__close" onClick ={()=> dispatch(setPopupTakeDisplay('none'))} variant="outline-primary">X</Button>
                </div>
                <Table striped bordered hover size="sm" onClick={e => e.preventDefault()}>
                <thead>
                    <tr>
                        <th>Взятые ключи</th>
                    </tr>
                </thead>
                <KeyList/>
                </Table>
                
            </div>
        </div>
    );
};

export default PopupTake;