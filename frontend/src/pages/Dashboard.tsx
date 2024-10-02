import { FaUserDoctor as imgEmpleado } from "react-icons/fa6";
import { FaUserPlus as imgCrearEmpleado } from "react-icons/fa";
import { IoReceiptSharp as imgDetalleConsulta } from "react-icons/io5";
import { FaFileCirclePlus as imgCrearConsulta } from "react-icons/fa6";
import { FaUsers as imgDetallePacientes } from "react-icons/fa6";
import { MdOutlinePersonalInjury as imgCrearPaciente } from "react-icons/md";
import DashboardCardButton from "../components/DashboardCardButton";
import LeftSidePanel from "../components/LeftSidePanelDashboard";
import TitleMenus from "../components/TitleMenus";

const Dashboard = () => {
  return (
    <div className="flex bg-black flex-col min-h-screen h-full justify-center items-center">
      {/* <LeftSidePanel /> */}
      <TitleMenus title="Bienvenido de vuelta" />
      <div className="grid grid-cols-1 gap-10 h-full w-full m-auto md:grid-cols-2  md:w-[60vw] md:h-[60vh]  bg-loginBgPink">
        <DashboardCardButton
          image={imgEmpleado}
          title="Administrar Empleados"
          description="Maneja la data de los empleados"
          link="/empleados/administrar/"
        />
        <DashboardCardButton
          image={imgCrearEmpleado}
          title="Crear Empleados"
          description="Crea nuevos empleados y asignales roles"
          link="/empleados/crear"
        />
        <DashboardCardButton
          image={imgDetalleConsulta}
          title="Administrar Consultas"
          description="Maneja la data de las consultas"
          link="/consultas/"
        />
        <DashboardCardButton
          image={imgCrearConsulta}
          title="Crear Consulta"
          description="Crea una consulta nueva"
          link="/consultas/crear"
        />
        <DashboardCardButton
          image={imgDetallePacientes}
          title="Adminsitrar Pacientes"
          description="Maneja la data del registro de pacientes"
          link="/pacientes/"
        />
        <DashboardCardButton
          image={imgCrearPaciente}
          title="Crear Paciente"
          description="Crea un nuevo paciente"
          link="/pacientes/crear"
        />
      </div>
    </div>
  );
};

export default Dashboard;
