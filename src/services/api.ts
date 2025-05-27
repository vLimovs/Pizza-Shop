import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token')
        if(accessToken && accessToken != null) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    }, 
    (error) => {
        console.log(error);
    }
)

export default api