import ManageCrearAdm from "../forms/CrearAdministrativoForm/ManageCrearAdm"
import { useMutation } from "react-query"
import { CrearAdmFormType } from "../types/app-types"
import * as apiClient from '../api-client';
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContextProvider";

const CrearAdm = () => {

    const { notifyError, notifySuccess } = useToast();
    const navigate = useNavigate();
    const { mutate } = useMutation("crearAdm", apiClient.crearAdministrativo, {
        onSuccess: () => {
            notifySuccess("Empleado creado exitosamente!")
            navigate("/empleados/administrar/administrativos")
        },
        onError: () => {
            notifyError("Formato de datos Invalido!");
        }
    })

    const onSave = (data: CrearAdmFormType) => {
        mutate(data);
    }

    return (
        <ManageCrearAdm onSave={onSave} />
    )
}

export default CrearAdm
