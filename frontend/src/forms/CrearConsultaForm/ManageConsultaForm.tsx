import { useState } from 'react'
import TitleMenus from '../../components/TitleMenus'
import BuscarPacientes from './BuscarPacientes'
import BuscarMedico from './BuscarMedico';
import BuscarHorario from './BuscarHorario';
import * as apiClient from '../../api-client';
import { useMutation } from 'react-query';
import { useToast } from '../../context/ToastContextProvider';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageConsultaForm = () => {

    //Herramientas
    const { notifyError, notifySuccess } = useToast();
    const navigate = useNavigate();

    //Logica Mutate
    const { mutate, isLoading } = useMutation("crearConsulta", apiClient.crearConsultaAPI, {
        onSuccess: () => {
            notifySuccess("Consulta Creada Exitosamente");
            navigate("/") //Cambiara cuando se termine el ver Consultas
        },
        onError: () => {
            notifyError("Algo salio mal. Por favor, intentalo mas tarde.")
        }
    })

    // Pagina Actual
    const [currentPage, setCurrentPage] = useState(0);

    // Logica de Back
    const handleBack = () => {
        setCurrentPage(prev => prev - 1);
    }

    // Logica de Next 
    const handleNext = () => {
        if (currentPage == 0 && pacienteSelected == 0) {
            notifyError("Selecciona un paciente!")
        }
        else if (currentPage == 1 && doctorSelected == 0) {
            notifyError("Selecciona un Medico!")
        }
        else if (currentPage == 2 && horaSeleccionada == 0) {
            notifyError("Selecciona un horario y fecha!")
        }
        else if (currentPage != 2) {
            setCurrentPage(prev => prev + 1);
        } else {
            mutate({
                idPaciente: pacienteSelected,
                fechaDesignada: fechaSeleccionada,
                idHora: horaSeleccionada,
                idDentista: doctorSelected
            })
        }
    }



    //Agarra el id del paciente
    const [pacienteSelected, setPacienteSelected] = useState(0);
    //Agarra el id del Doctor
    const [doctorSelected, setDoctorSelected] = useState(0);
    //Seleccionar Fecha
    const [fechaSeleccionada, setFechaSelecionada] = useState<Date | string>('');
    // Seleccionar Horario con la fecha.
    const [horaSeleccionada, setHoraSeleccionada] = useState<number>(0);
    // Crear objeto para ser enviado al backend 


    return (
        <div className="flex flex-col h-screen bg-slate-400">
            <TitleMenus title="Crear Consulta" />
            {/* Body */}
            <div className="w-full h-full flex justify-center items-center ">
                {/* Form de crear Consulta */}
                <div className="w-full h-full flex flex-col md:w-[70vw] md:h-[80vh] rounded-2xl border-4 border-slate-700 bg-blue-600 py-4 items-center justify-around">
                    {/* Titulo */}
                    <div className="text-4xl font-bold text-white text-center">
                        {currentPage == 0 && "Para quien sera la consulta?"}
                        {currentPage == 1 && "Que medico sera asignado?"}
                        {currentPage == 2 && "Cual sera su horario?"}
                    </div>
                    {/* Tablas */}
                    <div className="w-[85%] h-[85%] bg-slate-200">
                        {isLoading ? <LoadingSpinner /> :
                            <div className="w-full h-full overflow-scroll object-cover">
                                {/* Primer Paso Seleccionar Paciente */}
                                {
                                    currentPage == 0 && <BuscarPacientes pacienteSelected={pacienteSelected} setPacienteSelect={setPacienteSelected} />
                                }
                                {/* Seleccionar Medico */}
                                {
                                    currentPage == 1 && <BuscarMedico doctorSelected={doctorSelected} setDoctorSelected={setDoctorSelected} />
                                }
                                {/* Seleccionar Fecha Y horario */}
                                {
                                    currentPage == 2 && <BuscarHorario medicoSelect={doctorSelected} setHoraSelect={setHoraSeleccionada} fechaSelect={fechaSeleccionada}
                                        setFechaSelect={setFechaSelecionada} />
                                }
                            </div>
                        }

                    </div>
                    {/* Botones de Siguiente y Back */}
                    <div className='w-full h-20'>
                        <div className='flex justify-around items-center'>
                            {/* Button BACK Hidden if its the first one */}
                            <button onClick={() => handleBack()} disabled={currentPage == 0} className='btn'>
                                Back
                            </button>
                            {/* Button Next Visible unless its the last one then it becomes Submit and its function changes */}
                            <button onClick={() => handleNext()} className='btn'>
                                {currentPage == 2 ? "Submit" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageConsultaForm
