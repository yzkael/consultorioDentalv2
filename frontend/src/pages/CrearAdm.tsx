import ManageCrearAdm from "../forms/CrearAdministrativoForm/ManageCrearAdm"
import { useMutation } from "react-query"
import { CrearAdmFormType } from "../types/app-types"
import * as apiClient from '../api-client';
import { useNavigate } from "react-router-dom";

const CrearAdm = () => {
    const navigate = useNavigate();
    const { mutate } = useMutation("crearAdm", apiClient.crearAdministrativo, {
        onSuccess: () => {
            alert("Super Dupper");
            navigate("/empleados/administrar/administrativos")
        },
        onError: () => {
            alert("Something went wrong");
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
