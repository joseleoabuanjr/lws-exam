import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './views/defaultLayout';
import GuestLayout from './views/guestLayout';
import Login from './components/login';
import Signup from './components/signup';
import NotFound from './components/notfound';
import Home from './components/home';
import Add from './components/Crud/add';

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
    path: "/",
    element: <GuestLayout/>,
    children: [
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/signup",
            element: <Signup/>,
        }, 
    ]
},
]);

export default router;