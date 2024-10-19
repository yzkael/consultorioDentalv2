import BuscarPacientes from "../components/crearConsultaComponents/buscarPacientes"
import TitleMenus from "../components/TitleMenus"

const CrearConsulta = () => {
    /*
        Primero debo escoger el paciente
        Luego el medico.. Este deberia ser buscado por  
        Especialidad
        Y deberia escogerse aqui mismo tambien..
        El Horario
                                            
    */
    return (
        <div className="flex flex-col h-screen bg-slate-400">
            <TitleMenus title="Crear Consulta" />
            {/* Body */}
            <div className="w-full h-full flex justify-center items-center ">
                {/* Form de crear Consulta */}
                <div className="w-full h-full flex flex-col md:w-[60vw] md:h-[70vh] rounded-2xl border-4 border-slate-700 bg-blue-600 py-4 items-center justify-around">
                    {/* Titulo */}
                    <div className="text-4xl font-bold text-white text-center">
                        Para quien sera la consulta?
                    </div>
                    {/* Buscador */}
                    <div className="w-[80%] h-[80%] bg-slate-200">
                        <BuscarPacientes />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrearConsulta
