import { createContext, useContext, useState } from "react";
import { useUser } from "./UserProvider";
import axios from "axios";
import config from "../config/env.config";

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const { loginUser } = useUser();

  const [userToBeRegistered, setUserToBeRegistered] = useState(null);

  const updateUserToBeRegistered = (userData) => {
    setUserToBeRegistered((current) => {
      return { ...current, ...userData };
    });
  };

  const registerUser = async () => {
    try {
      console.log(config.apiBaseUrl);
      const response = await axios.post(
        `${config.apiBaseUrl}/api/auth/register`,
        userToBeRegistered
      );
      if (response.status === 200) {
        console.log("User registered successfully");
        loginUser({
          email: userToBeRegistered.email,
          password: userToBeRegistered.password,
        });
      }
      // Optionally, you can automatically log in the user after registration
    } catch (error) {
      console.error("Error in registerUser:", error.message);
      // Handle registration error (show message, redirect, etc.)
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        userToBeRegistered,
        updateUserToBeRegistered,
        registerUser,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};

export { RegisterProvider, useRegister };
