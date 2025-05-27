import { useMutation, useQuery } from "react-query"
import { IRegister } from "../types/types"
import api from "./api"

export const useCurrentUser = () => {
    const accessToken = localStorage.getItem('access_token')
    return useQuery(['current'], () => api.get('auth/users/profile'), {
        enabled: !!accessToken,
        select: (response) => response.data
    })
}

export const useRegisterMutation = () => {
    return useMutation((userData: IRegister) => api.post('auth/register', userData))
}

async function refreshToken() {
    try {
        const response = await api.post('auth/login/refresh', {
            refresh: localStorage.getItem('refresh_token')
        })
        localStorage.setItem('access_token', response.data.access)
        return response.data.access
    } catch (error) {
        console.error('Ошибка обновления токена', error);
    }
}

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const accessToken = await refreshToken()
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                return api(originalRequest)
            } catch (error) {
                console.error('Ошибка обновления токена', error);
            }
        }
        return Promise.reject(error)
    }
)


export const useLoginMutation = () => {
    return useMutation((userData: IRegister) => api.post('auth/login', userData), {
        onSuccess: ({ data }) => {
            if (data && data.access) {
                localStorage.setItem('access_token', data.access)
                localStorage.setItem('refresh_token', data.refresh)
            }
        }
    })
}

export const useProfileMutation = (id:number) => {
    return useMutation((userData:IRegister) => api.put(`auth/users/${id}/update`, userData))
}

export const useAvatarMutation = (id:number) => {
    return useMutation((userData: FormData) => 
    api.put(`auth/users/${id}/update/avatar`, userData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    )
}