import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearEmpleado from "./pages/CrearEmpleado";
import CrearDentista from "./pages/CrearDentista";
import ManejarDentistas from "./pages/ManejarDentistas";
import EditarDentista from "./pages/EditarDentista";
import TestPage from "./pages/TestPage";

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
        path="/dashboard/dentistas/"
        element={
          <MainLayout>
            <ManejarDentistas />
          </MainLayout>
        }
      />
      <Route path="/dentistas/editar-dentista/:idDentista"
        element={
          <MainLayout>
            <EditarDentista />
          </MainLayout>
        } />
      <Route path="/test"
        element={
          <TestPage />
        } />
    </Routes>

  );
};

export default AppRoutes;
