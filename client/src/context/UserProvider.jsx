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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the user token in localStorage on component mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Decode the token to get user information
      const decodedToken = decodeToken(storedToken);

      if (decodedToken) {
        // Set user and authentication status
        setUser(decodedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/api/auth/login`,
        userData
      );
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token in localStorage for persistence
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in loginUser:", error.message);
      // Handle login error (show message, redirect, etc.)
    }
  };

  const registerUser = async (userData) => {
    try {
      const role = localStorage.getItem("role") || "student"; // Set default role to "student"
      userData.role = role;
      console.log(config.apiBaseUrl);
      await axios.post(`${config.apiBaseUrl}/api/auth/register`, userData);
      // Optionally, you can automatically log in the user after registration
      loginUser(userData);
    } catch (error) {
      console.error("Error in registerUser:", error.message);
      // Handle registration error (show message, redirect, etc.)
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, loginUser, registerUser, logoutUser }}
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
