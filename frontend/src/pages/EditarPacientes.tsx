import { useNavigate, useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import { useMutation, useQuery } from "react-query";
import { ManejarEditarPacienteType } from "../types/app-types";
import ManageEditarPaciente from "../forms/EditarPacienteForm/ManageEditarPaciente";
import { useToast } from "../context/ToastContextProvider";


const EditarPacientes = () => {

    const { notifyError, notifySuccess } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();

    //Sacar informacion para popular los campos
    const { data: pacienteData, isLoading: isFetching } = useQuery(["getPaciente", id], () => apiClient.getSinglePaciente(id as string), {
        retry: 1
    });


    //Logica del Edit

    const { mutate, isLoading: isUpdating } = useMutation("editarPaciente", apiClient.updatePacienteAPI, {
        onSuccess: () => {
            notifySuccess("Paciente Editado Exitosamente");
            navigate("/pacientes/administrar/")
        }, onError: () => {
            notifyError("Algo salio mal. Por favor, intentelo mas tarde.")
        }
    })

    const onSave = (data: ManejarEditarPacienteType) => {
        if (id) {
            mutate({ id: id, data })
        }
    }




    return (
        <ManageEditarPaciente pacienteData={pacienteData} isFetching={isFetching} isUpdating={isUpdating} onSave={onSave} />
    )
}

export default EditarPacientes
