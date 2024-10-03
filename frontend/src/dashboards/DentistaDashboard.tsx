import DashboardCardButton from "../components/DashboardCardButton"
import { IoReceiptSharp as imgDetalleConsulta } from "react-icons/io5";
import { FaUsers as imgDetallePacientes } from "react-icons/fa6";
import TitleMenus from "../components/TitleMenus";

const DentistaDashboard = () => {
    return (
        <div className="flex bg-loginBgPink flex-col min-h-screen h-full justify-center items-center">
            <TitleMenus title="Bienvenido de vuelta" />
            <div className="grid grid-cols-1 gap-10 h-full w-full m-auto md:min-h-full md:grid-cols-2  md:w-[60vw] md:h-[60vh]  bg-loginBgPink">
                <DashboardCardButton
                    image={imgDetalleConsulta}
                    title="Administrar Consultas"
                    description="Maneja la data de las consultas"
                    link="/consultas/"
                />
                <DashboardCardButton
                    image={imgDetallePacientes}
                    title="Adminsitrar Pacientes"
                    description="Maneja la data del registro de pacientes"
                    link="/pacientes/"
                />
            </div>
        </div>
    )
}

export default DentistaDashboard
