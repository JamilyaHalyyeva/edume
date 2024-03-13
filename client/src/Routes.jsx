import {Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { Price } from "./pages/pricing/Price";



export default function AppRoutes() {
  return (
    
   
    <Routes>
     <Route path="/" exact Component={Home}/>

    </Routes>
  
  );
}
