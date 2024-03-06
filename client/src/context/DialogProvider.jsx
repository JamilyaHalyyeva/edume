// src/DialogContext.js
import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    description: "",
    onStudentClick: () => {},
    onTeacherClick: () => {},
  });

  const openDialog = (description, onStudentClick, onTeacherClick) => {
    setDialogState({
      isOpen: true,
      description,
      onStudentClick,
      onTeacherClick,
    });
  };

  const closeDialog = () => {
    setDialogState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  return (
    <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
