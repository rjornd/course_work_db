import { useDispatch, useSelector } from "react-redux";
import EmployeeItem from "./employeeItem";
const EmployeeList = () => {
    const dispatch = useDispatch()
    const employees = useSelector(state => state.employees.employees)
    
    return ( 
        
       employees? <tbody>
            {employees.map(
                employee =>
                <EmployeeItem key = {employee.emplid} employee = {employee}/>
            )}
        </tbody> : 
        <tbody>
            Ожидание получения списка сотрудников.
        </tbody>
        
    );
};
export default EmployeeList;