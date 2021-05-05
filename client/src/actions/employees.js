import axios from 'axios'
import { API_URL } from '../config'
import { setAvailableCabs, setEmplKeys, setEmployees } from '../reducers/employeeReducer'

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
        console.log(e?.response?.data?.message)
    }
    }
}

