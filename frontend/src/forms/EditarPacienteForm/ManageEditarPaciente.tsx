import { FormProvider, useForm } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ManejarEditarPacienteType } from "../../types/app-types";
import { useEffect, useState } from "react";
import TitleMenus from "../../components/TitleMenus";
import EditarAdmPag1 from "../EditarAdministrativoForm/EditarAdmPag1";
import EditarAdmPag2 from "../EditarAdministrativoForm/EditarAdmPag2";


type ManageEditarPacienteProps = {
    pacienteData: ManejarEditarPacienteType | undefined;
    isFetching: boolean;
    isUpdating: boolean;
    onSave: (data: ManejarEditarPacienteType) => void;
}





const ManageEditarPaciente = ({ pacienteData, isFetching, isUpdating, onSave }: ManageEditarPacienteProps) => {

    const [currentPage, setCurrentPage] = useState(0);
    if (isFetching || isUpdating || !pacienteData) {
        <LoadingSpinner />
    }

    const formMethods = useForm<ManejarEditarPacienteType>();

    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        if (pacienteData) {
            reset({
                nombre: pacienteData.nombre,
                appaterno: pacienteData.appaterno,
                apmaterno: pacienteData.apmaterno,
                carnet: pacienteData.carnet,
                correo: pacienteData.correo,
                telefono: pacienteData.telefono
            });
        }
    }, [pacienteData, reset])

    const handleBack = () => {
        setCurrentPage(prev => prev - 1);
    }

    const onSubmit = handleSubmit((data: ManejarEditarPacienteType) => {
        if (currentPage !== 1) {
            setCurrentPage(prev => prev + 1)
        } else {
            onSave(data);
        }
    })


    return (
        <div className="page-wrapper">
            <TitleMenus title="Editar Pacientes" />
            <div className="page-wrapper">
                <FormProvider {...formMethods}>
                    <form className="form" onSubmit={onSubmit}>
                        {currentPage == 0 && <EditarAdmPag1 originalCarnet={pacienteData?.carnet} />}

                        {currentPage == 1 && <EditarAdmPag2 originalCorreo={pacienteData?.correo}
                            paciente={true} />}

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

export default ManageEditarPaciente
