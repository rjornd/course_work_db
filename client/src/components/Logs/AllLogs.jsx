
import { useDispatch, useSelector } from "react-redux";
import LogItem from "./LogItem";


const AllLogs = () => {
    let alllogs = useSelector(state => state.logs.logs)
    const employees = useSelector(state => state.employees.employees)
    const keys = useSelector(state => state.employees.allKeys)
    alllogs = alllogs.map(log => {
        switch(log.subjtype)
        {
        case "Сотрудник":
        {
            const empl = employees.find(employee => employee.emplid === log.subjid)
        if (empl) { 
            return {
            ...log,
            subject : empl
        }}
        else {
            return log;
            }
        }
        default: return log
        }
    })

    alllogs = alllogs.map(log => {
        switch(log.objtype)
        {
        case "Ключ":
        {
            const key = keys.find(key => key.keyid === log.objid)
        if (key) { 
            return {
            ...log,
            obj : key
        }}
        else {
            return log;
            }
        }
        case "Сотрудника":
        {
            const empl = employees.find(employee => employee.emplid === log.objid)
        if (empl) { 
            return {
            ...log,
            obj : empl
        }}
        else {
            return log;
            }
        }
        default: return log
        }
    })
    console.log(alllogs)
    return (
        <tbody>
            {alllogs.map((log, index) => <LogItem log = {log} key = {index} />)}
        </tbody>
    );
};

export default AllLogs;