import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearEmpleado from "./pages/CrearEmpleado";
import CrearDentista from "./pages/CrearDentista";
import ManejarDentistas from "./pages/ManejarDentistas";
import EditarDentista from "./pages/EditarDentista";
import TestPage from "./pages/TestPage";
import EditarAdm from "./pages/EditarAdm";
import CrearAdm from "./pages/CrearAdm";
import ManejarEmpleado from "./pages/ManejarEmpleado";
import ManejarAdm from "./pages/ManejarAdm";
import { useAuth } from "./context/RoleContextProvider";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn); //DEBUGER
  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/" element={
            <Login />
          } />
          <Route path="*" element={<Navigate to={'/'} />} />
        </>)}
      {isLoggedIn && (<>
        <Route path="/" element={<Dashboard />} />
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

        <Route path="*" element={<Navigate to={'/'} />} />

      </>)}

    </Routes>


  );
};

export default AppRoutes;
