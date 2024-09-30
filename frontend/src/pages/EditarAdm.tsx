import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import { EditarAdmFormType } from "../types/app-types";
import LoadingSpinner from "../components/LoadingSpinner";
import ManageEditarAdm from "../forms/EditarAdministrativoForm/ManageEditarAdm";
import { useToast } from "../context/ToastContextProvider";




const EditarAdm = () => {
    const { idAdm } = useParams();
    const navigate = useNavigate();
    const { notifyError, notifySuccess } = useToast();

    //Informacion Fetcheada del Adm (Para displayear al user lo que va a cambiar)
    const { data: admData, isLoading: isFetching } = useQuery(["fetchSingleAdm", idAdm], () => apiClient.getSingleAdm(idAdm as string), { retry: 0 })



    //Logica del Edit en si
    const { mutate, isLoading: isUpdating } = useMutation(({ idAdm, data }: { idAdm: string; data: EditarAdmFormType }) => apiClient.updateAdm(idAdm, data), {
        onSuccess: () => {
            notifySuccess("Administrativo editado exitosamente");
            navigate("/empleados/administrar/administrativos");
        }, onError: () => {
            notifyError("Formato de datos invalido")
        }
    })

    const onSave = (data: EditarAdmFormType) => {
        if (idAdm) {
            mutate({ idAdm, data })
        } else {
            return <LoadingSpinner />
        }
    }

    return (
        <ManageEditarAdm admData={admData} isFetching={isFetching} isUpdating={isUpdating} onSave={onSave} />
    )
}

export default EditarAdm
