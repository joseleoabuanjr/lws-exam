import { Outlet } from "react-router-dom";
import Navigation from "../views/navigation";

export default function Home() {

  return (
    <>
      <Navigation/>
      <Outlet/>
    </>
  )
}