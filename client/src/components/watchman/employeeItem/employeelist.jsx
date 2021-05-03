import { useDispatch, useSelector } from "react-redux";
import EmployeeItem from "./employeeItem";
const EmployeeList = () => {
    const dispatch = useDispatch()
    const employees = useSelector(state => state.employees.employees)
    
    return ( 
        <tbody>
            {employees.map(
                employee =>
                <EmployeeItem key = {employee.emplid} employee = {employee}/>
            )}
        </tbody>
    );
};
export default EmployeeList;