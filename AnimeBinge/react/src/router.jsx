import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './views/defaultLayout';
import GuestLayout from './views/guestLayout';
import Login from './components/login';
import Signup from './components/signup';
import NotFound from './components/notfound';
import Home from './components/home';
import Add from './components/add';

const router = createBrowserRouter([
{
    path: "/",
    element: <DefaultLayout/>,
    children:[
        {
            path: "/",
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
            path: "/guest/login",
            element: <Login/>,
        },
        {
            path: "/guest/signup",
            element: <Signup/>,
        }, 
    ]
},
{ 
    path: "*",
    element: <NotFound/>,
},
]);

export default router;