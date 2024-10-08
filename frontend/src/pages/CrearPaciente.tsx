import { useMutation } from "react-query";
import * as apiClient from '../api-client';
import { useToast } from "../context/ToastContextProvider";
import { CrearPersonaFormType } from "../types/app-types";
import ManageCrearPaciente from "../forms/CrearPacienteForm/ManageCrearPaciente";
import { useNavigate } from "react-router-dom";

const CrearPaciente = () => {
    const { notifyError, notifySuccess } = useToast();
    const navigate = useNavigate();
    const { mutate } = useMutation("crearPaciente", apiClient.createPaciente, {
        onSuccess: () => {
            notifySuccess("Paciente Creado Exitosamente!")
            // TODO: Aqui vendra el navigate a el Ver Pacientes
            navigate('/');
        },
        onError: () => {
            notifyError("Datos invalidos. Porfavor cambiar los datos un formato valido");
        }
    })

    const onSave = (data: CrearPersonaFormType) => {
        mutate(data);
    }

    return (
        <ManageCrearPaciente onSave={onSave} />
    )
}

export default CrearPaciente
