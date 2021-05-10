const SET_EMPLOYEES = "SET_EMPLOYEES"
const SET_SELECTED_EMPLOYEE = "SET_SELECTED_EMPLOYEE"
const SET_POPUP_GET_DISPLAY = "SET_POPUP_GET_DISPLAY"
const SET_POPUP_TAKE_DISPLAY = "SET_POPUP_TAKE_DISPLAY"
const SET_AVAILABLE_CABS = "SET_AVAILABLE_CABS"
const SET_EMPL_KEYS = "SET_EMPL_KEYS"
const SET_KEYS_FOR_THIS_CAB = "SET_KEYS_FOR_THIS_CAB"
const SET_ALL_KEYS = "SET_ALL_KEYS"
const defaultState = {
    employees: [],
    selectedEmployee: {},
    popupGetDisplay: 'none',
    popupTakeDisplay: 'none',
    availableCabs: [],
    employeeKeys: [],
    keysForThisCab: [],
    allKeys: []
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
        case SET_SELECTED_EMPLOYEE:
            return {
                ...state,
                selectedEmployee: action.payload
            }
        case SET_POPUP_GET_DISPLAY:
            return {
                ...state,
                popupGetDisplay: action.payload
            }
        case SET_POPUP_TAKE_DISPLAY:
            return {
                ...state,
                popupTakeDisplay: action.payload
            }    
        case SET_AVAILABLE_CABS:
            return {
                ...state,
                availableCabs: action.payload
            }
        case SET_EMPL_KEYS:
            return {
                ...state,
                employeeKeys: action.payload
            }
        case SET_KEYS_FOR_THIS_CAB:
            return {
                ...state,
                keysForThisCab: action.payload
            }
        case SET_ALL_KEYS:
            return {
                ...state,
                allKeys: action.payload
            }
        default:
            return state;
    }
}
export const setEmployees = (employees) => ({type: SET_EMPLOYEES, payload: employees})
export const setSelectedEmployee = employee => ({type: SET_SELECTED_EMPLOYEE, payload: employee})
export const setPopupGetDisplay = display => ({type: SET_POPUP_GET_DISPLAY, payload: display})
export const setPopupTakeDisplay = display => ({type: SET_POPUP_TAKE_DISPLAY, payload: display})
export const setAvailableCabs = cabs => ({type: SET_AVAILABLE_CABS, payload: cabs})
export const setEmplKeys = keys => ({type: SET_EMPL_KEYS, payload: keys})
export const setkeysForThisCab = keys => ({type: SET_KEYS_FOR_THIS_CAB, payload: keys})
export const setAllKeys = keys => ({type: SET_ALL_KEYS, payload: keys})