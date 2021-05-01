import axios from 'axios'
import { API_URL } from '../config'
import {setUser} from '../reducers/userReducer'
export const registration = async (nickname, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            nickname,
            password
        })
    } catch (e) {
        alert(e?.response?.data?.message)
    }

}

export const login =  (nickname, password) => {
    return async dispatch => {
    try {
        const response = await axios.post(`${API_URL}api/auth/login`, {
            nickname,
            password
        })
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
    } catch (e) {
        alert(e?.response?.data?.message)
    }
    }
}

export const auth =  (nickname, password) => {
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

export const uploadAvatar =  (file) => {
        return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(
                `${API_URL}api/files/avatar`, formData,
            {
                headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
            }
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar =  () => {
    return async dispatch => {
    try {
        const response = await axios.delete(
            `${API_URL}api/files/avatar`,
        {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        )
        dispatch(setUser(response.data))
    } catch (e) {
        console.log(e)
    }
}
}