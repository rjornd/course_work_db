const SET_EMPLOYEES = "SET_EMPLOYEES"
const defaultState = {
    employees: [],
}
export default function employeeReducer(state = defaultState, action)
{
    switch (action.type)
    {
        case SET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            }
        default: 
            return state;
    }
}
export const setEmployees = (employees) => ({type: SET_EMPLOYEES, payload: employees})