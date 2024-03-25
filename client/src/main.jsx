import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";
import  Routes  from "./Routes";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
  
    <UserProvider>
        <Routes />
      </UserProvider>
    
    </BrowserRouter>
    </React.StrictMode>





 
);
