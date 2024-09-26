import { useFormContext } from "react-hook-form";
import { CrearDentistaFormType } from "../../types/app-types";
import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../../api-client'
import FormFragmentWrapper from "../FormFragments/FormFragmentWrapper";




const InformacionDentista = () => {
    const [carnetValue, setCarnetValue] = useState("");
    const {
        register,
        formState: { errors },

    } = useFormContext<CrearDentistaFormType>();

    const { isError: errorCarnet } = useQuery(["checkCarnet", carnetValue], () => apiClient.checkCarnet(carnetValue), {
        enabled: !!carnetValue,
        retry: false
    });

    const handleChange = (value: string) => {
        setCarnetValue(value);
    }




    return (
        <FormFragmentWrapper title="Informacion Dentista">
            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Nombre:
                <input
                    type="text"
                    className="border border-blue-500 w-full py-1 px-2 font-normal"
                    {...register("nombre", { required: "Este campo es necesario" })}
                />
                {errors.nombre && (
                    <div className="flex justify-center">
                        <span className="text-sm text-red-600 ">
                            {errors.nombre.message}
                        </span>
                    </div>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Apellido Paterno:
                <input
                    type="text"
                    className="border border-blue-500 w-full py-1 px-2 font-normal"
                    {...register("apPaterno", { required: "Este campo es necesario" })}
                />
                {errors.apPaterno && (
                    <div className="flex justify-center">
                        <span className="text-sm text-red-600 ">
                            {errors.apPaterno.message}
                        </span>
                    </div>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Apellido Materno:
                <input
                    type="text"
                    className="border border-blue-500 w-full py-1 px-2 font-normal"
                    {...register("apMaterno", { required: "Este campo es necesario" })}
                />
                {errors.apMaterno && (
                    <div className="flex justify-center">
                        <span className="text-sm text-red-600 ">
                            {errors.apMaterno.message}
                        </span>
                    </div>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
                Carnet:
                <input
                    type="text"
                    className="border border-blue-500 w-full py-1 px-2 font-normal"
                    {...register("carnet", { required: "Este campo es necesario", onChange: e => handleChange(e.target.value) })}
                />
                {errors.carnet && (
                    <div className="flex justify-center">
                        <span className="text-sm text-red-600 ">
                            {errors.carnet.message}
                        </span>
                    </div>
                )}
                {errorCarnet && carnetValue != "" &&
                    <div className="flex justify-center">
                        <span className="text-sm text-red-600">Ese carnet ya ha sido registrado!</span>
                    </div>}
            </label>
            {/* Deteca Solito que es un boton y que le dara Next*/}
            <button className="py-2 px-4 bg-slate-700 rounded-lg w-[5rem] flex justify-center items-center hover:bg-slate-500 text-white font-semibold cursor-pointer" disabled={errorCarnet && carnetValue != ""}>
                Next
            </button>
        </FormFragmentWrapper>
    );
};

export default InformacionDentista;
