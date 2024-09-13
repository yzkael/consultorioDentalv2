import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EditarDentistaFormType } from "../../types/app-types";
import { TailSpin } from "react-loader-spinner";


type ManageEditarDentistaProps = {
    onSave: (data: EditarDentistaFormType) => void;
    isEditing: boolean;
    isFetching: boolean;
    dentista: EditarDentistaFormType | undefined;
}



const ManageEditarDentista = ({ onSave, isEditing, dentista, isFetching }: ManageEditarDentistaProps) => {



    const formMethods = useForm<EditarDentistaFormType>();
    const [paginaActual, setPaginaActual] = useState(0);
    const { handleSubmit } = formMethods;


    if (isFetching || !dentista || isEditing) {
        return <div className="w-full h-screen flex items-center justify-center">
            <TailSpin
                visible={true}
                height="100%"
                width="100%"
                color="#D10056"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }


    const onSubmit = handleSubmit((data: EditarDentistaFormType) => {
        if (paginaActual != 2) {
            setPaginaActual(prev => prev + 1);
        } else {
            onSave(data);
        }
    })

    return (
        <div className="w-full h-full">
            <FormProvider {...formMethods}>
                <form className="w-[60vw] h-[60vh] bg-slate-400" onSubmit={onSubmit}>
                    {/* TODO */}
                </form>
            </FormProvider>
        </div>
    )
}

export default ManageEditarDentista
