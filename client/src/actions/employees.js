import axios from 'axios'
import { API_URL } from '../config'
import { setEmployees } from '../reducers/employeeReducer'

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

