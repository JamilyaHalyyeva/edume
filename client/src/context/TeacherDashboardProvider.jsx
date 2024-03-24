import { createContext, useState, useContext } from "react";

// Create a context for the teacher's dashboard
const TeacherDashboardContext = createContext();

// Create a provider for the teacher's dashboard
const TeacherDashboardProvider = ({ children }) => {
  return (
    <TeacherDashboardContext.Provider value={{}}>
      {children}
    </TeacherDashboardContext.Provider>
  );
};

// Create a custom hook for using the teacher's dashboard context
const useTeacherDashboard = () => {
  const context = useContext(TeacherDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherDashboard must be used within a TeacherDashboardProvider"
    );
  }
  return context;
};

export { TeacherDashboardProvider, useTeacherDashboard };