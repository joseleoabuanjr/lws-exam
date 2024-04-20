import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function guestLayout(){

    return (
      <>
        <NavBar/>
        <Outlet/>
      </>
    )
}