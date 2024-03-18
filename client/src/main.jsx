import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";
import  Routes  from "./Routes";
import { Header } from "./components/heading/Header";

import { Footer } from "./components/footer/Footer";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header/>
    <UserProvider>
        <Routes />
      </UserProvider>
    <Footer/>
    </BrowserRouter>
    </React.StrictMode>





 
);
