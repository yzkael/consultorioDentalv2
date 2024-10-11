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


//Debo hacerlo igual al ManejarAdm con los useStates y todo para poder tener la misma funcionalidad
const ManejarPacientes = () => {
    //Para invalidar la query y reiniciar la busqueda
    const queryClient = useQueryClient();
    const { notifyError, notifySuccess } = useToast();

    //Manejara los datos de busqueda
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })
    //Valores para manejar el PopUp de "estas seguro que quieres eliminar este dato?"

    const [isActive, setIsActive] = useState(false); //Maneja la visibilidad del PopUp
    const [confirmBorrar, setConfirmBorrar] = useState(false);
    const [idDelete, setIdDelete] = useState(""); //Guardan el Id para ser borrado luego


    // // Informacion Fetcheada de pantalla
    // const { data: pacientes, isLoading } = useQuery("getPacientes", apiClient.getAllPacientes, {
    //     retry: 1
    // })

    const { data: pacientes, isLoading } = useQuery(["searchPacientes", searchValues], () => apiClient.searchPacientesAPI(searchValues), {
        enabled: !!searchValues,
        retry: 1,
        refetchOnWindowFocus: false
    })

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



    const reaccionClick = (respuesta: boolean) => {
        if (respuesta) {
            mutate(idDelete);
            setConfirmBorrar(false);
        }
    }

    const handleSearch = (data: ManejarSearch) => {
        setSearchValues(data);
    }

    const handleClick = (idPaciente: string) => {
        setIsActive(prev => !prev);
        setIdDelete(idPaciente)
    }


    return (
        <>
            <div className="flex flex-col h-screen">
                <TitleMenus title="Manejar Pacientes" />
                <ConfirmDialog message="Deseas Eliminar este dato?" setRespuesta={setConfirmBorrar} isActive={isActive} reactClick={reaccionClick} setActive={setIsActive} />
                <SearchBar handleSearch={handleSearch} options={searchPacienteOpciones} />
                <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
                    {isLoading ? <LoadingSpinner /> :
                        <TablaManejar data={pacientes} handleClick={handleClick} differentAttribute="ninguno" dataName="pacientes" paciente={true} />

                    }

                </div>

            </div>


        </>
    )
}

export default ManejarPacientes
