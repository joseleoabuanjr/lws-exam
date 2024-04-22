import { createBrowserRouter } from 'react-router-dom';
import Home from './components/home';
import Guest from './components/guest';
import Login from './views/login';
import Signup from './views/signup';
import HomeContent from './views/homecontent';
import Discover from './components/discover';
import AnimeForm from './views/animeform';
import AnimeList from './views/animelist';

const router = createBrowserRouter([
{
    path: "/",
    element: <Home/>,
    children:[
        {
            path: "/",
            element: <HomeContent/>,
        },
    ]
},
{
    path: "/discover",
    element: <Discover/>,
    children: [
        {
            path: "/discover/",
            element: <AnimeList/>,
        },
        {
            path: "/discover/addanime",
            element: <AnimeForm key="animeCreate"/>,
        },
        {
            path: "/discover/edit/:id",
            element: <AnimeForm key="animeUpdate"/>,
        },
    ]
},
{
    path: "/",
    element: <Guest/>,
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