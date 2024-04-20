import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function defaultLayout() {

    return (
      <>
        <NavBar/>
        <Outlet/>
      </>
    )
}