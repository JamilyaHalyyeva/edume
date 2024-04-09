import { createContext, useContext, useState } from "react";

const TeacherSelectionContext = createContext();

const TeacherSelectionProvider = ({ children }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <TeacherSelectionContext.Provider
      value={{
        selectedLesson,
        setSelectedLesson,
      }}
    >
      {children}
    </TeacherSelectionContext.Provider>
  );
};

const useTeacherSelection = () => {
  const context = useContext(TeacherSelectionContext);
  if (!context) {
    throw new Error(
      "useTeacherSelection must be used within a TeacherSelectionProvider"
    );
  }
  return context;
};
export { TeacherSelectionProvider, useTeacherSelection };
