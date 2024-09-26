import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearEmpleado from "./pages/CrearEmpleado";
import CrearDentista from "./pages/CrearDentista";
import ManejarDentistas from "./pages/ManejarDentistas";
import EditarDentista from "./pages/EditarDentista";
import TestPage from "./pages/TestPage";
import { crearAdministrativo } from "./api-client";
import CrearAdm from "./pages/CrearAdm";
import ManejarEmpleado from "./pages/ManejarEmpleado";

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
      <Route path="/empleados/administrar/" element={
        <ManejarEmpleado />
      } />
      <Route
        path="/empleados/administrar/dentistas"
        element={
          <MainLayout>
            <ManejarDentistas />
          </MainLayout>
        }
      />
      <Route path="/empleados/Administrar/dentistas/editar-dentista/:idDentista"
        element={
          <MainLayout>
            <EditarDentista />
          </MainLayout>
        } />
      <Route path="/test"
        element={
          <TestPage />
        } />
      <Route path="/empleados/crear/administrativos"
        element={<CrearAdm />} />
    </Routes>

  );
};

export default AppRoutes;
