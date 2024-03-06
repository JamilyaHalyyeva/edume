import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { DialogProvider } from "./context/DialogProvider";

const AppRoutes = () => {
  return (
    <DialogProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </DialogProvider>
  );
};

export default AppRoutes;
