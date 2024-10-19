import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CrearEmpleado from "./pages/CrearEmpleado";
import CrearDentista from "./pages/CrearDentista";
import ManejarDentistas from "./pages/ManejarDentistas";
import EditarDentista from "./pages/EditarDentista";
import EditarAdm from "./pages/EditarAdm";
import CrearAdm from "./pages/CrearAdm";
import ManejarEmpleado from "./pages/ManejarEmpleado";
import ManejarAdm from "./pages/ManejarAdm";
import { useAuth } from "./context/RoleContextProvider";
import SudoRoutes from "./utils/SudoRoutes";
import CrearPaciente from "./pages/CrearPaciente";
import AdministrativoRoutes from "./utils/AdministrativoRoutes";
import ManejarPacientes from "./pages/ManejarPacientes";
import EditarPacientes from "./pages/EditarPacientes";
import CrearConsulta from "./pages/CrearConsulta";
const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  return (


    //IMPLEMENTAR ROUTAS PROTEGIDAS DEPENDIENDO SEAN REQUERIDAS


    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/" element={
            <Login />
          } />
          <Route path="*" element={<Navigate to={'/'} />} />
        </>)}
      {isLoggedIn && (<>

        {/* RUTAS PARA EL ADMIN (Usuario SUDO) */}
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/empleados/crear"
          element={
            <MainLayout>
              <SudoRoutes>
                <CrearEmpleado />
              </SudoRoutes>
            </MainLayout>
          }
        />
        {/* Rutas Dentistas */}
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

        {/* Rutas Empleados ADM */}
        <Route path="/empleados/administrar/administrativos" element={<ManejarAdm />} />

        <Route path="/empleados/administrar/administrativos/editar-administrativo/:idAdm" element={<EditarAdm />} />


        <Route path="/empleados/crear/administrativos"
          element={<CrearAdm />} />

        {/* Rutas Paciente */}

        <Route path="/pacientes/crear" element={
          <AdministrativoRoutes>
            <CrearPaciente />
          </AdministrativoRoutes>

        } />

        <Route path="/pacientes/administrar/" element={
          <ManejarPacientes />
        } />

        <Route path="/pacientes/administrar/editar-pacientes/:id" element={
          <EditarPacientes />
        } />
        {/* Rutas Consulta */}
        <Route path="/consultas/crear" element={
          <MainLayout>
            <CrearConsulta />
          </MainLayout>
        } />
        {/* RUTA DEFAULT */}
        <Route path="*" element={<Navigate to={'/'} />} />

      </>)}

    </Routes>


  );
};

export default AppRoutes;
