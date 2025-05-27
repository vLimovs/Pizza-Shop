import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import userStore from "../store/userStore"
import { useCurrentUser } from "../services/auth"

const PrivateRoute = () => {
    const accessToken = localStorage.getItem('access_token')
    const {data} = useCurrentUser()
    const {setUser} = userStore()
    const navigate = useNavigate()
    useEffect(() => {
        if(data && accessToken) {
            setUser(data)
        }
    }, [data, accessToken])
    
    
    useEffect(() => {
        if (!accessToken) navigate('/login')
    }, [accessToken])


    return (
        <Outlet />
    )
}

export default PrivateRoute