import { useEffect } from "react";
import { Button, OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getLogs } from "../../actions/logs";

const LogItem = ({log}, key) => {
    const dispatch = useDispatch()
    const renderSwitchSubject = (subjtype) =>
        {
            switch(subjtype)
            {
                case "Сотрудник":
                    {
                        const popover = (
                            <Popover id="popover-basic">
                                <Popover.Title as="h3">{log?.subject?.first_name}</Popover.Title>
                                <Popover.Content>
                               {log?.subject ? <Table striped bordered hover size="sm" onClick={e => e.preventDefault()}>
                                      <thead>
                                          <tr>
                                            <th>ID</th>
                                              <th>Имя</th>
                                              <th>Фамилия</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                            <tr>
                                            <th>{log?.subject?.emplid}</th>
                                              <th>{log?.subject?.first_name}</th>
                                              <th>{log?.subject?.last_name}</th>
                                            </tr>
                                      </tbody>
                                  </Table> : <div>Вероятно, сотрудник с id {log.subjid} был удален</div>}
                              </Popover.Content>
                            </Popover>
                          );
                        return (
                            <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                                <Button variant="light">{log?.subject ? log.subject.first_name : "удален"}</Button>
                            </OverlayTrigger>
                        
                        )
                    }
                    
    
                default:
                return log?.subjid
            }
        };

        const renderSwitchObject = (objtype) =>
        {
            switch(objtype)
            {
                case "Ключ":
                    {
                        const popover = (
                            <Popover id="popover-basic">
                                <Popover.Title as="h3">{log?.obj?.keyid}</Popover.Title>
                                <Popover.Content>
                                {log?.obj ? <Table striped bordered hover size="sm" onClick={e => e.preventDefault()}>
                                      <thead>
                                          <tr>
                                            <th>ID</th>
                                              <th>Кабинет</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                            <tr>
                                            <th>{log.objid}</th>
                                              <th>{log.obj.cabinet}</th>
                                            </tr>
                                      </tbody>
                                  </Table> : <div>Вероятно, ключ с id {log.objid} был удален</div>}
                              </Popover.Content>
                            </Popover>
                          );
                        return (
                            <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                                <Button variant="light">{log?.obj?.keyid ? log.obj.keyid : "удален"}</Button>
                            </OverlayTrigger>
                         )
                    }
                    case "Сотрудника":
                        {
                            const popover = (
                                <Popover id="popover-basic">
                                    <Popover.Title as="h3">{log?.obj?.first_name}</Popover.Title>
                                    <Popover.Content>
                                    {log?.obj ? <Table striped bordered hover size="sm" onClick={e => e.preventDefault()}>
                                          <thead>
                                              <tr>
                                                <th>ID</th>
                                                  <th>Имя</th>
                                                  <th>Фамилия</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                                <tr>
                                                <th>{log.obj.emplid}</th>
                                                  <th>{log.obj.first_name}</th>
                                                  <th>{log.obj.last_name}</th>
                                                </tr>
                                          </tbody>
                                      </Table> : <div>Вероятно, сотрудник с id {log.objid} был удален</div>}
                                  </Popover.Content>
                                </Popover>
                              );
                            return (
                                <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                                    <Button variant="light">{log?.obj ? log.obj.first_name : "удален"}</Button>
                                </OverlayTrigger>
                             )
                        }
                default:
                return log?.objid
            }
        };
    return (
        
    <tr key={key}>
        <td>{log?.subjtype}</td>
        <td>{renderSwitchSubject(log?.subjtype)}</td>
        <td>{log?.act}</td>
        <td>{log?.objtype}</td>
        <td>{renderSwitchObject(log?.objtype)}</td>
        <td>{log?.time}</td>
    </tr>
    );
};

export default LogItem ;