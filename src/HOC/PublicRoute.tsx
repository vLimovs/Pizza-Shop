import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

const PublicRoute = () => {
    const accessToken = localStorage.getItem('access_token')
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken) navigate('/')
    }, [accessToken])
    
    return (
        <Outlet />
    )
}

export default PublicRoute