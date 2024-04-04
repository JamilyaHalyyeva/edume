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

  const addGrade = (grade) => {
    console.log("addGrade-_grade:", grade);
    //add grade to userToBeRegistered
    if (userToBeRegistered.teacherClassTypeGrades) {
      updateUserToBeRegistered({
        teacherClassTypeGrades: [
          ...userToBeRegistered.teacherClassTypeGrades,
          grade,
        ],
      });
    } else {
      updateUserToBeRegistered({
        teacherClassTypeGrades: [grade],
      });
    }
  };
  const removeGrade = (grade) => {
    //remove grade from userToBeRegistered
    updateUserToBeRegistered({
      teacherClassTypeGrades: userToBeRegistered.teacherClassTypeGrades.filter(
        (g) =>
          g.grade._id !== grade.grade._id ||
          g.classType._id !== grade.classType._id
      ),
    });
  };
  const removeAllGradesWithClassType = (classType) => {
    //remove all grades with classType from userToBeRegistered
    if (userToBeRegistered.teacherClassTypeGrades) {
      updateUserToBeRegistered({
        teacherClassTypeGrades:
          userToBeRegistered.teacherClassTypeGrades.filter(
            (g) => g.classType._id !== classType._id
          ),
      });
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        userToBeRegistered,
        updateUserToBeRegistered,
        registerUser,
        addGrade,
        removeGrade,
        removeAllGradesWithClassType,
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
