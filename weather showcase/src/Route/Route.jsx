import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/Global_contet";
import Home from "../weather_main/home";
import Login from "../login/login";
import Register from "../register/register";
import Searching from "../Searching/searching";


export default function Path(){
    const {isAuthenticated,setisAuthenticated} = useContext(GlobalContext)
   
    return (
        <>
    <Routes>
      <Route path="/" element={<Home />} />
    <Route path="/login" element = {<Login/>} />
    <Route path="/register" element = {<Register/>} />
    <Route path="/Get_Weather" element = {<Searching/>} />

    </Routes>

        
        </>
    )
}