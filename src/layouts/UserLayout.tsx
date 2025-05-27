import { ReactNode } from "react"
import User from "../components/User/User"
const UserLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="wrapper">
        <User/>
        <div className="container">
          {children}
        </div>
    </div>
  )
}

export default UserLayout