import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearEmpleado from "./pages/CrearEmpleado";
import CrearDentista from "./pages/CrearDentista";
import ManejarDentistas from "./pages/ManejarDentistas";
import EditarDentista from "./pages/EditarDentista";
import TestPage from "./pages/TestPage";
import ToastContextProvider from "./context/ToastContextProvider";
import EditarAdm from "./pages/EditarAdm";
import CrearAdm from "./pages/CrearAdm";
import ManejarEmpleado from "./pages/ManejarEmpleado";
import ManejarAdm from "./pages/ManejarAdm";

const AppRoutes = () => {
  return (
    <ToastContextProvider>

      <Routes>
        <Route path="/" element={

          <Login />

        } />
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
        <Route path="/empleados/administrar/dentistas/editar-dentista/:idDentista"
          element={
            <MainLayout>
              <EditarDentista />
            </MainLayout>
          } />

        <Route path="/empleados/administrar/administrativos" element={<ManejarAdm />} />

        <Route path="/empleados/administrar/administrativos/editar-administrativo/:idAdm" element={<EditarAdm />} />


        <Route path="/empleados/crear/administrativos"
          element={<CrearAdm />} />

        <Route path="/test"
          element={<TestPage />} />
      </Routes>
    </ToastContextProvider>


  );
};

export default AppRoutes;
