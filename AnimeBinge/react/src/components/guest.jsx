import {  Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function Guest(){

  const { token } = useStateContext()

  if(token){
    return <Navigate to="/" />
  }

  return (
    <>
      <Outlet/>
    </>
  )
}