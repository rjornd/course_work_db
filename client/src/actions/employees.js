import axios from 'axios'
import { API_URL } from '../config'
import { setAllKeys, setAvailableCabs, setEmplKeys, setEmployees, setkeysForThisCab } from '../reducers/employeeReducer'
import { logout } from '../reducers/userReducer'

export const getEmployees =  () => {
    return async dispatch => {
    try {
        
        const response = await axios.get(
            `${API_URL}api/employees`, 
        {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        )
        dispatch(setEmployees(response.data))
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const getCabs =  (employee) => {
    return async dispatch => {
    try {
        const response = await axios.post(
            `${API_URL}api/cabs`, {employee},
        {
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }
        )
        dispatch(setAvailableCabs(response.data))
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const getKeys =  (employee) => {
    return async dispatch => {
    try {
        const response = await axios.post(
            `${API_URL}api/keys`, {employee},
        {
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }
        )
        dispatch(setEmplKeys(response.data))
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const addAvCabinet =  (employee, cabinet) => {
    return async dispatch => {
    try {
        const response = await axios.post(
            `${API_URL}api/addAvCabinet`, {employee, cabinet},
        {
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }
        )
        dispatch(setAvailableCabs(response.data))
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const takeKey =  (employee, keyid) => {
    return async dispatch => {
    try {
        const response = await axios.post(
            `${API_URL}api/takeKey`, {employee, keyid},
        {
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }
        )
        dispatch(setEmplKeys(response.data))
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const removeAvCabinet =  (employee, id) => {
    return async dispatch => {
    try {
        const response = await axios.post(
            `${API_URL}api/removeAvCabinet`, {employee, id}, 
        {
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        dispatch(setAvailableCabs(response.data))
    } catch (e) {

        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const keysForThisCab =  (cabinet) => {
    return async dispatch => {
    try {
        const response = await axios.post(
            `${API_URL}api/keysForThisCab`, {cabinet}, 
        {
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
        dispatch(setkeysForThisCab(response.data))
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const giveKey =  (employeeid, keyid) => {
    return async dispatch => {
    try {
        const response = await axios.post(
            `${API_URL}api/giveKey`, {employeeid, keyid}, 
        {
            headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        }
        )
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}

export const allKeys = () =>{
    return async dispatch => {
        try {
            const response = await axios.get(
                `${API_URL}api/allKeys`, 
            {
                headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            }
            )
            dispatch(setAllKeys(response.data))
        } catch (e) {
           
            console.log(e?.response?.data?.message)
        }
        }
}

export const removeKey = (keyid) =>{
    return async dispatch => {
        try {
            const response = await axios.post(
                `${API_URL}api/removeKey`, {keyid},
            {
                headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            }
            )
            dispatch(setAllKeys(response.data))
        } catch (e) {
           
            console.log(e?.response?.data?.message)
        }
        }
}