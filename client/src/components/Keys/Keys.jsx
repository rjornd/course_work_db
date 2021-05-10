import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allKeys } from "../../actions/employees";
import AllKeys from "./AllKeys";

const Keys = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(allKeys())
      }, [] )
    return (
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
    );
};

export default Keys;