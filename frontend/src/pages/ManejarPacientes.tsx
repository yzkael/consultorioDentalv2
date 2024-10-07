import { useQuery, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useState } from "react";
import { ManejarSearch } from "../types/app-types";
import TitleMenus from "../components/TitleMenus";
import TablaManejar from "../components/TablaManejar";


//Debo hacerlo igual al ManejarAdm con los useStates y todo para poder tener la misma funcionalidad
const ManejarPacientes = () => {
    //Para invalidar la query y reiniciar la busqueda
    const queryClient = useQueryClient();

    //Manejara los datos de busqueda
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })
    //Valores para manejar el PopUp de "estas seguro que quieres eliminar este dato?"

    const [isActive, setIsActive] = useState(false); //Maneja la visibilidad del PopUp

    const [confirmBorrar, setConfirmBorrar] = useState(false);

    const [idDelete, setIdDelete] = useState(""); //Guardan el Id para ser borrado luego



    // Primero consigamos que se muestren en pantalla

    const { data: pacientes, isLoading } = useQuery("getPacientes", apiClient.getAllPacientes, {
        retry: 1
    })



    const handleClick = () => {

    }


    return (
        <>
            <TitleMenus title="Manejar Pacientes" />
            <TablaManejar data={pacientes} handleClick={handleClick} differentAttribute="ninguno" dataName="pacientes" paciente={true} />


        </>
    )
}

export default ManejarPacientes
