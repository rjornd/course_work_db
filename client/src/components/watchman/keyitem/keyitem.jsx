import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { takeKey } from "../../../actions/employees";

const KeyItem = ({emplkey}, key) => {
    const dispatch = useDispatch()
    const selectedEmployee = useSelector(state => state.employees.selectedEmployee)
    function clickHandle(e)
    {
        dispatch(takeKey(selectedEmployee, emplkey.keyid))
    }
    return (
    <tr key= {key}>
        <td>{emplkey.cabinet}</td>
        <td>{emplkey.keyid}</td>
        <td><Button variant="warning" onClick = {(e) => clickHandle(e)}>Принять ключ</Button></td>
    </tr>
    );
};
export default KeyItem;