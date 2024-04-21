import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './components/defaultLayout';
import GuestLayout from './components/guestLayout';
import Login from './views/login';
import Signup from './views/signup';
import NotFound from './views/notfound';
import Home from './views/home';
import Add from './views/Crud/add';

const router = createBrowserRouter([
{
    path: "/",
    element: <DefaultLayout/>,
    children:[
        {
            path: "/home",
            element: <Home/>,
        },
        {
            path: "/add",
            element: <Add/>,
        }
    ]
},
{
    path: "/guest",
    element: <GuestLayout/>,
    children: [
        {
            path: "/guest/home",
            element: <Home/>,
        },
        {
            path: "/guest/login",
            element: <Login/>,
        },
        {
            path: "/guest/signup",
            element: <Signup/>,
        }, 
    ]
},
]);

export default router;