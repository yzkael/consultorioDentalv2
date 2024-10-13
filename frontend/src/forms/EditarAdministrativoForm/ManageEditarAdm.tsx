import { useEffect, useState } from "react";
import { EditarAdmFormType, ManejarEditarPacienteType } from "../../types/app-types"
import { useForm, FormProvider } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner";
import TitleMenus from "../../components/TitleMenus";
import EditarAdmPag1 from "./EditarAdmPag1";
import EditarAdmPag2 from "./EditarAdmPag2";
import PaginationComponent from "../../components/PaginationComponent";


type ManageEditarAdmProps = {
    isFetching: boolean;
    admData?: EditarAdmFormType | undefined;
    isUpdating: boolean;
    onSave: (data: EditarAdmFormType) => void;
}

const ManageEditarAdm = ({ admData, isFetching, isUpdating, onSave }: ManageEditarAdmProps) => {



    if (isUpdating || isFetching) {
        return <LoadingSpinner />
    }

    const [currentPage, setCurrentPage] = useState(0);
    const formMethods = useForm<EditarAdmFormType>();
    const { handleSubmit, reset } = formMethods;
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
                cargo: admData.cargo,
                fechanacimiento: formatedDate
            });
        }
    }, [admData, reset])

    const handleBack = () => {
        setCurrentPage(prev => prev - 1);
    }


    const onSubmit = handleSubmit((data: EditarAdmFormType) => {
        if (currentPage !== 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            onSave(data);
        }
    })


    return (
        <div className="page-wrapper">
            <TitleMenus title="Editar Administrativo" />
            <div className="page-wrapper">
                <FormProvider {...formMethods}>
                    <form className="form" onSubmit={onSubmit}>

                        {currentPage == 0 && <EditarAdmPag1 originalCarnet={admData?.carnet} />}
                        {currentPage == 1 && <EditarAdmPag2 originalCorreo={admData?.correo} />}


                        {currentPage == 1 && (
                            <div className="flex justify-around">
                                <button className="btn" onClick={handleBack}>Back</button>
                                <button className="btn" disabled={isFetching}>Submit</button>
                            </div>
                        )}
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default ManageEditarAdm
