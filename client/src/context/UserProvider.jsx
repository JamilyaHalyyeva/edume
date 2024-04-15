// userContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config/env.config";
import { decodeToken } from "../util/authUtils";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const decodedToken = decodeToken(storedToken);
        if (decodedToken) {
          setUser(decodedToken);
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          setIsAuthenticated(false);
          navigate("/"); // Or to the login page
        }
      } else {
        setIsAuthenticated(false);
        navigate("/"); // Or to the login page
      }
      setIsLoading(false); // Authentication check complete
    };

    checkAuthStatus();
  }, []);

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/api/auth/login`,
        userData
      );
      const { token } = response.data;
      if (!token) throw new Error("Invalid User");
      const decodedToken = decodeToken(token);
      localStorage.setItem("token", token); // Save token in localStorage for persistence
      setUser(decodedToken);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in loginUser:", error.message);
      // Handle login error (show message, redirect, etc.)
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
