import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearEmpleado from "./pages/CrearEmpleado";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/empleados/crear"
        element={
          <MainLayout>
            <CrearEmpleado />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
