import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { allKeys, getKeys } from "../../actions/employees";
import { getLogs } from "../../actions/logs";
import AllLogs from "./AllLogs";

const Logs = () => {
    function getData()
    {
        dispatch(getLogs())
        dispatch(allKeys())
    }
    const dispatch = useDispatch()
    useEffect(() => {
        getData()
      }, [] )
    return (
        <div>
            <Table striped bordered size="sm" onClick={e => e.preventDefault()}>
            <thead>
                <tr>
                <th>Тип</th>
                <th>Субъект</th>
                <th>Действие</th>
                <th>Тип</th>
                <th>Объект</th>
                <th>Время</th>
                </tr>
            </thead>
            <AllLogs/>
            </Table>
            
        </div>
    );
};

export default Logs;