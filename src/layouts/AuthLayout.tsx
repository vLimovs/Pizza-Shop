import { ReactNode } from 'react'
import logo from '../assets/images/logo.svg'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="auth">
        <div className="auth__logo">
            <img src={logo} alt="" />
        </div>
        <div className="auth__body">
            {children}
        </div>
    </div>
  )
}

export default AuthLayout