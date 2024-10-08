import { useFormContext } from "react-hook-form"
import { EditarDentistaFormType } from "../../types/app-types"

const Pagina1FormularioEditar = () => {
    const { register, formState: { errors } } = useFormContext<EditarDentistaFormType>()
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className=" bg-slate-500 flex justify-center items-center h-5">
                    Informacion Personal:
                </div>
                <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                    Nombre:
                    <input type="text"
                        className="border border-blue-500 w-full py-1 px-2 font-normal"
                        {...register("nombre", { required: "This field is required" })} />
                    {errors.nombre && <span className="text-sm text-red-500 opacity-75">{errors.nombre.message}</span>}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                    Apellido Paterno:
                    <input type="text" className="border border-blue-500 w-full py-1 px-2 font-normal" {...register("appaterno", { required: "This field is required" })} />
                    {errors.appaterno && <span className="text-sm text-red-500 font-semibold">{errors.appaterno.message}</span>}

                </label>
                <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                    Apellido Materno:
                    <input type="text" className="border border-blue-500 w-full py-1 px-2 font-normal" {...register("apmaterno", { required: "This field is required" })} />
                    {errors.apmaterno && <span className="text-sm text-red-500 font-semibold">{errors.apmaterno.message}</span>}

                </label>
                <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                    Carnet:
                    <input type="text" className="border border-blue-500 w-full py-1 px-2 font-normal"
                        {...register("carnet", { required: "This field is required" })} />
                    {errors.carnet && <span className="text-sm text-red-500 font-semibold">{errors.carnet.message}</span>}

                </label>
            </div>
        </>
    )
}

export default Pagina1FormularioEditar
