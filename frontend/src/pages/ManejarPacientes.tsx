import { useQuery, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useState } from "react";
import { ManejarSearch } from "../types/app-types";


//Debo hacerlo igual al ManejarAdm con los useStates y todo para poder tener la misma funcionalidad
const ManejarPacientes = () => {

    //Manejara los datos de busqueda
    const [searchValue, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })

    //Para invalidar la query y reiniciar la busqueda
    const queryClient = useQueryClient();

    //Valores para manejar el PopUp de "estas seguro que quieres eliminar este dato?"

    const [isActive, setIsActive] = useState(false); //Maneja la visibilidad del PopUp

    const [confirmBorrar, setConfirmBorrar] = useState(false);

    const [idDelete, setIdDelete] = useState(""); //Guardan el Id para ser borrado luego



    //Mejor completo el Backend Sino se me va a complicar la vida...


    // OJO: Luego voy a tener que cambiar esta funcion para poder darle un trigger con la busqueda
    const { data, isLoading } = useQuery("getPacientes", apiClient.getAllPacientes, {
        retry: 0,
        refetchOnWindowFocus: false,
    });


    if (!data) {
        return <div>Loading...</div>
    }


    const handleClick = () => {
        console.log(data[1].nombre);
    }
    return (
        <div>

        </div>
    )
}

export default ManejarPacientes
