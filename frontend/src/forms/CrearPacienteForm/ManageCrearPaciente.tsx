import { useState } from "react"
import { CrearPersonaFormType } from "../../types/app-types";
import { FormProvider, useForm } from 'react-hook-form'
import TitleMenus from "../../components/TitleMenus";
import InformacionPersonal2 from "../CrearAdministrativoForm/InformacionPersonal2";
import InformacionPersonal1 from "../CrearAdministrativoForm/InformacionPersonal1";
type ManageCrearPacienteProps = {
    onSave: (data: CrearPersonaFormType) => void;
}

const ManageCrearPaciente = ({ onSave }: ManageCrearPacienteProps) => {

    const [currentPage, setCurrentPage] = useState(0);
    const formMethods = useForm<CrearPersonaFormType>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((data: CrearPersonaFormType) => {
        if (currentPage != 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            onSave(data);
        }
    })

    const handleBack = () => {
        setCurrentPage(prev => prev - 1);
    }


    return (
        <div className="w-full h-screen flex flex-col">
            <TitleMenus title="Crear Paciente" />
            <div className="form-wrapper">
                <FormProvider {...formMethods}>
                    <form className="form" onSubmit={onSubmit}>
                        {currentPage == 0 && <InformacionPersonal1 />}
                        {currentPage == 1 &&
                            <InformacionPersonal2 handleBack={handleBack} paciente={true} />}
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default ManageCrearPaciente