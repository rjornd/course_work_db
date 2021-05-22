const SET_LOGS = "SET_LOGS"
const DELETE_LOGS = "DELETE_LOGS"
const defaultState = {
    logs: []
}
export default function logsReducer(state = defaultState, action)
{
    switch (action.type)
    {
        case SET_LOGS:
            return {...state, logs: action.payload}
        case DELETE_LOGS:
            return {...state, logs: []}
        default: 
            return state;
    }
}
export const setLogs = logs => ({type: SET_LOGS, payload: logs})
export const deleteLogs = () => ({type: DELETE_LOGS})