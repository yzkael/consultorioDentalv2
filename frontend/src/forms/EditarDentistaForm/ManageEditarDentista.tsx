import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EditarDentistaFormType } from "../../types/app-types";
import { TailSpin } from "react-loader-spinner";
import Pagina1FormularioEditar from "./Pagina1FormularioEditar";
import Pagina2FormularioEditarDentista from "./Pagina2FormularioEditarDentista";

type ManageEditarDentistaProps = {
    onSave: (data: EditarDentistaFormType) => void;
    isEditing: boolean;
    isFetching: boolean;
    dentista: EditarDentistaFormType | undefined;
}

const ManageEditarDentista = ({ onSave, isEditing, dentista, isFetching }: ManageEditarDentistaProps) => {
    if (!dentista) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
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
        );
    }
    const formMethods = useForm<EditarDentistaFormType>({});
    const { reset, setValue, handleSubmit } = formMethods;
    const [paginaActual, setPaginaActual] = useState(0);

    useEffect(() => {
        if (dentista) {
            const formatedDate = new Date(dentista.fechanacimiento).toISOString().split('T')[0];
            reset({
                nombre: dentista.nombre,
                appaterno: dentista.apmaterno,
                apmaterno: dentista.appaterno,
                correo: dentista.correo,
                carnet: dentista.carnet,
                telefono: dentista.telefono,
                especialidad: dentista.especialidad
            });
            setValue("fechanacimiento", formatedDate);
        }
    }, [dentista, reset]);
    if (isFetching) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
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
        );
    }

    const onSubmit = handleSubmit((data: EditarDentistaFormType) => {
        if (paginaActual !== 1) {
            setPaginaActual(prev => prev + 1);
        } else {
            onSave(data);
        }
    });

    return (
        <div className="w-full h-full flex items-center justify-center">
            <FormProvider {...formMethods}>
                <form className="w-full h-full bg-slate-400" onSubmit={onSubmit}>
                    {paginaActual === 0 && <Pagina1FormularioEditar />}
                    {paginaActual === 1 && <Pagina2FormularioEditarDentista />}
                    {paginaActual == 1 && <button onClick={() => setPaginaActual(paginaActual - 1)}>Back</button>}
                    <button
                        disabled={isEditing}
                        className="py-1 px-2 disabled:bg-slate-800 bg-slate-500 hover:bg-slate-300"
                        type="submit"
                    >
                        {isEditing ? "Loading..." : paginaActual === 1 ? "Submit" : "Next"}
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}

export default ManageEditarDentista;
