import { useState } from "react";
import { CrearAdmFormType } from "../../types/app-types";
import { FormProvider, useForm } from 'react-hook-form'
import InformacionPersonal2 from "./InformacionPersonal2";
import InformacionPersonal1 from "./InformacionPersonal1";
import DatosUsuarioAdm from "./DatosUsuarioAdmin";
import TitleMenus from "../../components/TitleMenus";

type ManageCrearAdmProps = {
    onSave: (data: CrearAdmFormType) => void;
}


const ManageCrearAdm = ({ onSave }: ManageCrearAdmProps) => {


    const formMethods = useForm<CrearAdmFormType>();
    const [currentPage, setCurrentPage] = useState(0);
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((data: CrearAdmFormType) => {
        if (currentPage != 2) {
            setCurrentPage(currentPage + 1);
        } else {
            onSave(data);
        }
    })

    const handleBack = () => {
        setCurrentPage(currentPage - 1);
    }



    return (
        <div className="w-full h-screen flex flex-col">
            <TitleMenus title={"Crear Administrativo"} />
            <div className="form-wrapper">
                <FormProvider {...formMethods}>
                    <form className="form" onSubmit={onSubmit}>
                        {currentPage == 0 && <InformacionPersonal1 />}
                        {currentPage == 1 && <InformacionPersonal2 handleBack={handleBack} />}
                        {currentPage == 2 && <DatosUsuarioAdm handleBack={handleBack} />}
                    </form>
                </FormProvider>
            </div>

        </div >
    )
}

export default ManageCrearAdm
