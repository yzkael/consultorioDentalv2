import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EditarDentistaFormType } from "../../types/app-types";

const ManageEditarDentista = () => {
    const formMethods = useForm<EditarDentistaFormType>();
    const [paginaActual, setPaginaActual] = useState(0);
    const { handleSubmit } = formMethods;
    return (
        <FormProvider {...formMethods}>
            <form action=""></form>
        </FormProvider>

    )
}

export default ManageEditarDentista
