import { Button } from "react-bootstrap";

const CabinetItem = ({cabinet}) => {
    function clickHandle(e)
    {

    }
    return ( 
        <tr>
        <td>{cabinet.cabinet}</td>
        <td><Button onClick = {(e) => clickHandle(e)}>Выдать ключ</Button></td>
        <td><Button variant="danger" onClick = {(e) => clickHandle(e)}>X</Button></td>
    </tr>
    );
};
export default CabinetItem;