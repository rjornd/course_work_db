import axios from 'axios'
import { API_URL } from '../config'
import { logout } from '../reducers/userReducer'
import {setLogs} from "../reducers/logsReducer"
export const getLogs =  () => {
    return async dispatch => {
    try {
        
        const response = await axios.get(
            `${API_URL}api/getLogs`, 
        {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        )
        dispatch(setLogs(response.data))
    } catch (e) {
        dispatch(logout())
        localStorage.removeItem('token');
        console.log(e?.response?.data?.message)
    }
    }
}
