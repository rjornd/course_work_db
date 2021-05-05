import { useDispatch, useSelector } from "react-redux";
import KeyItem from "./keyitem";

const KeyList = () => {
    const dispatch = useDispatch()
    const employeekeys = useSelector(state => state.employees.employeeKeys)
    
    return ( 
        <tbody>
            {employeekeys.map(
                emplkey =>
                <KeyItem key = {emplkey.keyid} emplkey = {emplkey}/>
            )}
        </tbody>
    );
};
export default KeyList;