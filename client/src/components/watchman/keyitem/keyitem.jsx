import { Button } from "react-bootstrap";

const KeyItem = ({emplkey}, key) => {
    function clickHandle(e)
    {

    }
    return ( 
        <tr key= {key}>
        <td>{emplkey.cabinet}</td>
        <td>{emplkey.id}</td>
        <td><Button variant="warning" onClick = {(e) => clickHandle(e)}>Принять ключ</Button></td>
    </tr>
    );
};
export default KeyItem;