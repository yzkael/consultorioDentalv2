import { useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { ManejarEditarPacienteType } from "../types/app-types";


const EditarPacientes = () => {

    const { idPaciente } = useParams();

    //Sacar informacion para popular los campos
    const { data: paciente, isLoading } = useQuery(["getPaciente", idPaciente], () => apiClient.getSinglePaciente(idPaciente as string), {
        retry: 1
    });


    //Logica del Edit

    const { mutate, isLoading: isUpdating } = useMutation("editarPaciente", apiClient.updatePacienteAPI, {
        onSuccess: () => {
            alert("Yay");
        }, onError: () => {
            alert("Not yay");
        }
    })


    const onSave = (data: ManejarEditarPacienteType) => {
        if (idPaciente) {
            mutate({ id: idPaciente, data })
        }
    }




    return (
        <div>
            Hello
        </div>
    )
}

export default EditarPacientes
