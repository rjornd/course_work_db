import axios from 'axios'
import { API_URL } from '../config'
import {setUser} from '../reducers/userReducer'

export const registration = async (first_name, last_name,login, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            first_name,
            last_name,
            login,
            password
        })
    } catch (e) {
        alert(e?.response?.data?.message)
    }

}

export const login =  (login, password) => {
    return async dispatch => {
    try {
        const response = await axios.post(`${API_URL}api/auth/login`, {
            login,
            password
        })
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
    } catch (e) {
        alert(e?.response?.data?.message)
    }
    }
}

export const auth =  (login, password) => {
    return async dispatch => {
    try {
        const response = await axios.get(
            `${API_URL}api/auth/auth`, 
        {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        )
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token);
    } catch (e) {
        localStorage.removeItem('token');
    }
    }
}

