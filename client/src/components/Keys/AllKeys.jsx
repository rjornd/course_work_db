import { useDispatch, useSelector } from "react-redux";
import OneKey from "./OneKey";

const AllKeys = () => {
    var allkeys = useSelector(state => state.employees.allKeys)
    const employees = useSelector(state => state.employees.employees)
    allkeys = allkeys.map(keyitem => {
        
        const empl = employees.find(employee => employee.emplid === keyitem.employeeid)
        if (empl) { 
            return {
            ...keyitem,
            first_name : empl.first_name,
            last_name : empl.last_name
        }}
        else {
            return keyitem
        }
    })
    const dispatch = useDispatch()
    return (
        <tbody>
            {allkeys.map(
                keyitem =>
                <OneKey key = {keyitem.keyid} keyitem = {keyitem}/>
            )}
        </tbody>
    );
};

export default AllKeys;