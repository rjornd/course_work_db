import { Button, OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { giveKey, keysForThisCab, removeAvCabinet } from "../../../../actions/employees";

const CabinetItem = ({cabinet}) => {
    const dispatch = useDispatch()
    const selectedEmployee = useSelector(state => state.employees.selectedEmployee)
    const keysforthiscab = useSelector(state => state.employees.keysForThisCab)
    function removeHandle(e)
    {
        dispatch(removeAvCabinet(selectedEmployee, cabinet.id))
    }
    function giveHandle(e)
    {
        dispatch(keysForThisCab(cabinet.cabinet))
    }
    const KeyItem = ({keyitem}, key) => {
        function clickHandle(e)
        {
            dispatch(giveKey(selectedEmployee.emplid, keyitem.keyid))
        }
        return(
            
            <tr key= {key}>
                <td>{keyitem.keyid}</td>
                <td>{keyitem.employeeid ? "Занят" : "Свободен"}</td>
                <td><Button variant={keyitem.employeeid ? "danger" : "primary"} onClick = {(e) => clickHandle(e)} disabled= {keyitem.employeeid ? true : false}>Выдать</Button></td>
            </tr>
        
        )
    }
    const popover1 = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Ключи к этому кабинету</Popover.Title>
            <Popover.Content>
            <Table striped bordered hover size="sm" onClick={e => e.preventDefault()}>
                  <thead>
                      <tr>
                          <th>ID ключа</th>
                          <th>Состояние</th>
                      </tr>
                  </thead>
                  <tbody>
                      {keysforthiscab.map(keyitem => <KeyItem key={keyitem.keyid} keyitem={keyitem} />)}
                  </tbody>
              </Table>
          </Popover.Content>
        </Popover>
      );
      const popover2 = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Ключи к этому кабинету</Popover.Title>
            <Popover.Content>
            Нет ключей к этому кабинету.
          </Popover.Content>
        </Popover>
      );
      
    return ( 
        keysforthiscab.length ? 
    <tr>
        <td>{cabinet.cabinet}</td>
        <td>
            <OverlayTrigger trigger="focus" placement="right" overlay={popover1}>
            <Button onClick = {(e) => giveHandle(e)}>Выдать ключ</Button>
            </OverlayTrigger>
        </td>
        <td><Button variant="danger" onClick = {(e) => removeHandle(e)}>X</Button></td>
    </tr>
    :
    <tr>
        <td>{cabinet.cabinet}</td>
        <td>
            <OverlayTrigger trigger="focus" placement="right" overlay={popover2}>
            <Button onClick = {(e) => giveHandle(e)}>Выдать ключ</Button>
            </OverlayTrigger>
        </td>
        <td><Button variant="danger" onClick = {(e) => removeHandle(e)}>X</Button></td>
    </tr>
    );
};
export default CabinetItem;