import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useState } from "react";
import { ManejarSearch } from "../types/app-types";
import TitleMenus from "../components/TitleMenus";
import TablaManejar from "../components/TablaManejar";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContextProvider";
import SearchBar from "../components/SearchBar";
import { searchPacienteOpciones } from "../config/config-files";
import LoadingSpinner from "../components/LoadingSpinner";
import PaginationComponent from "../components/PaginationComponent";


//Debo hacerlo igual al ManejarAdm con los useStates y todo para poder tener la misma funcionalidad
const ManejarPacientes = () => {
    // Valores de Paginacion
    const [paginaActual, setPaginaActual] = useState(1);
    //Para invalidar la query y reiniciar la busqueda
    const queryClient = useQueryClient();
    const { notifyError, notifySuccess } = useToast();

    //Manejara los datos de busqueda
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })
    //Valores para manejar el PopUp de "estas seguro que quieres eliminar este dato?"

    const [isActive, setIsActive] = useState(false); //Maneja la visibilidad del PopUp
    const [confirmBorrar, setConfirmBorrar] = useState(false);
    const [idDelete, setIdDelete] = useState(""); //Guardan el Id para ser borrado luego




    const { data: pacientes, isLoading } = useQuery(["searchPacientes", searchValues, paginaActual], () => apiClient.searchPacientesAPI(searchValues, paginaActual), {
        enabled: !!searchValues || !!paginaActual,
        retry: 1,
        refetchOnWindowFocus: false
    })

    const handleSearch = (data: ManejarSearch) => {
        setPaginaActual(1); //Devuelve a la pagina 1
        setSearchValues(data);
    }


    //Logica del Delete:

    const { mutate } = useMutation("deletePaciente", apiClient.deletePaciente, {
        onSuccess: () => {
            notifySuccess("Paciente Eliminado Exitosamente")
            queryClient.invalidateQueries("searchPacientes") //Cambiara luego 
        },
        onError: () => {
            notifyError("Error al Eliminar Paciente. Por favor Intentelo mas tarde")
        }
    })
    //Logica del estas seguro?
    const reaccionClick = (respuesta: boolean) => {
        if (respuesta) {
            mutate(idDelete);
            setConfirmBorrar(false);
        }
    }

    const handleClick = (idPaciente: string) => {
        setIsActive(prev => !prev);
        setIdDelete(idPaciente)
    }

    //Logica de la paginacion


    return (
        <>
            <div className="flex flex-col h-screen">
                <TitleMenus title="Manejar Pacientes" />
                <ConfirmDialog message="Deseas Eliminar este dato?" setRespuesta={setConfirmBorrar} isActive={isActive} reactClick={reaccionClick} setActive={setIsActive} />
                <SearchBar handleSearch={handleSearch} options={searchPacienteOpciones} />
                <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
                    {isLoading ? <LoadingSpinner /> :
                        <TablaManejar data={pacientes?.data} handleClick={handleClick} differentAttribute="ninguno" dataName="pacientes" paciente={true} />
                    }
                </div>
                <PaginationComponent numeroDatos={pacientes?.total} selected={paginaActual} setSelected={setPaginaActual} limite={pacientes?.limite as number} />
            </div>


        </>
    )
}

export default ManejarPacientes
