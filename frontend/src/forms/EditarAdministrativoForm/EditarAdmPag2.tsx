import { useQuery } from "react-query";
import * as apiClient from '../../api-client';
import { useState } from "react";
import FormFragmentWrapper from "../FormFragments/FormFragmentWrapper";
import { useFormContext } from "react-hook-form";
import { EditarAdmFormType } from "../../types/app-types";
import DisplayError from "../../components/DisplayError";
import { cargoOptions } from "../../config/config-files";

type EditarAdmPag2Props = {
    originalCorreo: string;
    handleBack: () => void;
}


const EditarAdmPag2 = ({ originalCorreo, handleBack }: EditarAdmPag2Props) => {

    const [correoValue, setCorreoValue] = useState(originalCorreo);

    const { isError } = useQuery(["checkCorreo", correoValue], () => apiClient.checkCorreo(correoValue), {
        enabled: !!correoValue,
        retry: false
    });

    const { register, formState: { errors } } = useFormContext<EditarAdmFormType>();

    const handleChange = (value: string) => {
        if (value != originalCorreo) {
            setCorreoValue(value);
        }
    }
    return (
        <FormFragmentWrapper title="Informacion Personal Administrativo">
            <label className="label">
                Correo:
                <input type="text" className="input" {...register("correo", { required: "Este campo es necesario", onChange: (e) => handleChange(e.target.value) })} />
                {errors.correo && <DisplayError message={errors.correo.message as string} />}
                {isError && correoValue != originalCorreo && <DisplayError message="Ese correo ya esta siendo utilizado" />}
            </label>
            <label className="label">
                Telefono:
                <input type="text" className="input" {...register("telefono", { required: "Este campo es necesario" })} />
                {errors.telefono && <DisplayError message={errors.telefono.message as string} />}
            </label>
            <label className="label">
                Fecha de Nacimiento:
                <input type="date" className="input"{...register("fechanacimiento", { required: "Este campo es necesario" })} />
                {errors.fechanacimiento && <DisplayError message={errors.fechanacimiento.message as string} />}
            </label>
            <label className="label">
                Cargo:
                <select {...register("cargo", { required: "Este campo es necesario" })}>
                    {cargoOptions.map((cargo) => (
                        <option value={cargo.id}>{cargo.nombre}</option>
                    ))}
                </select>
            </label>


        </FormFragmentWrapper>
    )
}

export default EditarAdmPag2
