import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import  Routes  from "./Routes";
import { Header } from "./components/heading/Header";
import Home from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Footer } from "./components/footer/Footer";
import { Price } from "./pages/pricing/Price";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header/>
    <Routes>
    
    
   

    </Routes>
    <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);
