import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearEmpleado from "./pages/CrearEmpleado";
import CrearDentista from "./pages/CrearDentista";
import ManejarDentistas from "./pages/ManejarDentistas";
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
      <Route
        path="/empleados/crear/dentistas"
        element={
          <MainLayout>
            <CrearDentista />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard/empleados/"
        element={
          <MainLayout>
            <ManejarDentistas />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
