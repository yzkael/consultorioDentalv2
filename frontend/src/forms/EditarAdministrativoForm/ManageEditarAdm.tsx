import { useEffect, useState } from "react";
import { EditarAdmFormType } from "../../types/app-types"
import { useForm, FormProvider } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner";


type ManageEditarAdmProps = {
    admData: EditarAdmFormType | undefined;
    isFetching: boolean;
    isUpdating: boolean;
    onSave: (data: EditarAdmFormType) => void;
}

const ManageEditarAdm = ({ admData, isFetching, isUpdating, onSave }: ManageEditarAdmProps) => {

    if (!admData) {
        return <LoadingSpinner />
    }
    if (isUpdating) {
        return <LoadingSpinner />
    }
    if (isUpdating) {
        return <LoadingSpinner />
    }


    const [currentPage, setCurrentPage] = useState(0);
    const formMethods = useForm<EditarAdmFormType>();
    const { handleSubmit, setValue, reset } = formMethods;

    useEffect(() => {
        if (admData) {
            const formatedDate = new Date(admData.fechanacimiento).toISOString().split("T")[0];
            reset({
                nombre: admData.nombre,
                appaterno: admData.appaterno,
                apmaterno: admData.apmaterno,
                correo: admData.correo,
                carnet: admData.carnet,
                telefono: admData.telefono,
                cargo: admData.cargo
            });
            setValue("fechanacimiento", formatedDate);
        }
    }, [admData, reset])




    return (
        <div>

        </div>
    )
}

export default ManageEditarAdm
