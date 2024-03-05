import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import  Routes  from "./Routes";
import { Header } from "./components/heading/Header";
import Home from "./pages/home/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" exact Component={Home}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
