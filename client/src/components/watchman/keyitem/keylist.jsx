import { useDispatch, useSelector } from "react-redux";
import KeyItem from "./keyitem";

const KeyList = () => {
    const dispatch = useDispatch()
    const employeekeys = useSelector(state => state.employees.employeeKeys)
    
    return (
        employeekeys.length?        
        <tbody>
            
            {employeekeys.map(
                emplkey =>
                <KeyItem key = {emplkey.keyid} emplkey = {emplkey}/>
            )}
        </tbody>:
        <tbody>
            <tr key = "1">
            <td colSpan="2">У этого сотрудника нет взятых ключей.</td>
            </tr>
        </tbody>
    );
};
export default KeyList;