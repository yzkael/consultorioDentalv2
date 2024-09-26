import { useFormContext } from "react-hook-form"
import { EditarDentistaFormType } from "../../types/app-types"
import { especialidadesOptions } from "../../config/config-files"

const Pagina2FormularioEditarDentista = () => {
    const { register, formState: { errors } } = useFormContext<EditarDentistaFormType>()
    return (
        <div className="flex flex-col gap-4">
            <div className=" bg-slate-500 flex justify-center items-center h-5">
                Informacion Personal:
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Correo:
                <input type="text" className="border border-blue-500 w-full py-1 px-2 font-normal" {...register("correo", { required: "Un correo es required" })} />
                {errors.correo && <span className="text-sm text-red-500 font-semibold">{errors.correo.message}</span>}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Telefono:
                <input type="text" className="border border-blue-500 w-full py-1 px-2 font-normal"{...register("telefono", { required: "Un telefono es required" })} />
                {errors.telefono && <span className="text-sm text-red-500 font-semibold">{errors.telefono.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Fecha de Nacimiento:
                <input type="date" className="border border-blue-500 w-full py-1 px-2 font-normal" {...register("fechanacimiento", { required: "Una fecha de nacimiento es required" })} />
                {errors.fechanacimiento && <span className="text-sm text-red-500 font-semibold">{errors.fechanacimiento.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Especialidad:
                <select className="text-gray-700 text-sm font-bold flex-1 mx-10 "
                    {...register("especialidad", { required: "Este campo es requerido" })}
                >
                    {especialidadesOptions.map((especialidad) => (
                        <option value={especialidad.id}>{especialidad.nombre}</option>
                    ))}
                </select>
                {errors.especialidad && <span className="text-sm text-red-500">{errors.especialidad.message}</span>}
            </label>

        </div>
    )
}

export default Pagina2FormularioEditarDentista
