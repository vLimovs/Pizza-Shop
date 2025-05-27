import { createBrowserRouter } from "react-router";
import { paths } from "./paths";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../HOC/PrivateRoute";
import PublicRoute from "../HOC/PublicRoute";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Current from "../pages/Current";
import Ordered from "../pages/Ordered";


export const router = createBrowserRouter([
    {
        path: paths.menu,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Menu/>
            }
        ],
    },
    {
        path: paths.current,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Current/>
            }
        ],
    },
    {
        path: paths.ordered,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Ordered/>
            }
        ],
    },
    {
        path: paths.profile,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Profile/>
            }
        ],
    },
    {
        path: paths.cart,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Cart/>
            }
        ],
    },
    {
        path: paths.login,
        element: <PublicRoute/>,
        children: [
            {
                index: true,
                element: <Login/>
            }
        ],
    },
    {
        path: paths.register,
        element: <PublicRoute/>,
        children: [
            {
                index: true,
                element: <Register/>
            }
        ],
    },
])