
import { Outlet } from "react-router-dom";
import Navigation from "../views/navigation.jsx";


export default function Discover() {

    return (
        <>
        <div>
            <Navigation/>
            Discover Anime
            <Outlet/>
        </div>
        </>
    )
}