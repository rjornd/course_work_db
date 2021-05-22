import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addKey, allKeys } from "../../actions/employees";
import Input from "../../utils/input/Input";
import AllKeys from "./AllKeys";
import './keys.css'
const Keys = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const [cabinet, setCabinet] = useState('')
    useEffect(() => {
        dispatch(allKeys())
      }, [] )

    
    function addHandler(childRef) {
        dispatch(addKey(cabinet));
        childRef.current.HandleClear();
    }
    const childRef = useRef();
    return (
        <div>
            <div className="tab-wrapper">
        <Table striped bordered size="sm" onClick={e => e.preventDefault()}>
            <thead>
                <tr>
                <th>ID Ключа</th>
                <th>Кабинет</th>
                </tr>
            </thead>
            <AllKeys/>
            </Table>
        </div>
            <div>
            <Input ref = {childRef} type ="text" placeholder = "Добавить доступный кабинет" value={cabinet} setValue={setCabinet}/>
            <div className="bton">
            <Button className="popup__create" onClick={() => addHandler(childRef)}>Добавить</Button>
            </div>
                
            </div>
        </div>
        
        
    );
};

export default Keys;