import { Button, OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeKey } from "../../actions/employees";

const OneKey = ({keyitem}, key) => {
    const dispatch = useDispatch()
    function employeeHandle(e)
    {

    }
    function deleteHandle(e)
    {
        dispatch(removeKey(keyitem.keyid))
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Сотрудник взял ключ</Popover.Title>
            <Popover.Content>
            <Table striped bordered hover size="sm" onClick={e => e.preventDefault()}>
                  <thead>
                      <tr>
                        <th>ID</th>
                          <th>Имя</th>
                          <th>Фамилия</th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr>
                        <th>{keyitem.employeeid}</th>
                          <th>{keyitem.first_name}</th>
                          <th>{keyitem.last_name}</th>
                        </tr>
                  </tbody>
              </Table>
          </Popover.Content>
        </Popover>
      );
    return (
        keyitem.employeeid == null ?
        <tr key={key}>
            <td>{keyitem.keyid}</td>
            <td>{keyitem.cabinet}</td>
            <td><Button variant="danger" disabled>Свободен</Button></td>
            <td><Button variant="warning" onClick={(e) => deleteHandle(e)}>Удалить</Button></td>
        </tr>
        :
        <tr key={key}>
            <td>{keyitem.keyid}</td>
            <td>{keyitem.cabinet}</td>
            <td><OverlayTrigger trigger="focus" placement="right" overlay={popover}>
            <Button onClick = {(e) => employeeHandle(e)}>Взят сотрудником</Button>
            </OverlayTrigger></td>
            <td><Button variant="warning" onClick={(e) => deleteHandle(e)}>Удалить</Button></td>
        </tr>
    );
};

export default OneKey;