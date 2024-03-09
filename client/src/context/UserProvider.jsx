// userContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = async (userData) => {
    try {
      const response = await axios.post("/api/auth/login", userData);
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token in localStorage for persistence
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error in loginUser:", error.message);
      // Handle login error (show message, redirect, etc.)
    }
  };

  const registerUser = async (userData) => {
    try {
      await axios.post("/api/auth/register", userData);
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
