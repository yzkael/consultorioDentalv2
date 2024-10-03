import DashboardCardButton from "../components/DashboardCardButton"
import { FaFileCirclePlus as imgCrearConsulta } from "react-icons/fa6";
import { MdOutlinePersonalInjury as imgCrearPaciente } from "react-icons/md";
import TitleMenus from "../components/TitleMenus";

const AdmDashboard = () => {
    return (
        <div className="flex bg-loginBgPink flex-col min-h-screen h-full justify-center items-center">
            <TitleMenus title="Bienvenido de vuelta" />
            <div className="grid grid-cols-1 gap-10 h-full w-full m-auto md:min-h-full md:grid-cols-2  md:w-[60vw] md:h-[60vh]  bg-loginBgPink">
                <DashboardCardButton
                    image={imgCrearConsulta}
                    title="Crear Consulta"
                    description="Crea una consulta nueva"
                    link="/consultas/crear"
                />
                <DashboardCardButton
                    image={imgCrearPaciente}
                    title="Crear Paciente"
                    description="Crea un nuevo paciente"
                    link="/pacientes/crear"
                />
            </div>
        </div>
    )
}

export default AdmDashboard
