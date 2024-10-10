import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as apiClient from '../../api-client'
import FormFragmentWrapper from '../FormFragments/FormFragmentWrapper';
import { EditarAdmFormType } from '../../types/app-types';
import DisplayError from '../../components/DisplayError';
import LoadingSpinner from '../../components/LoadingSpinner';


type EditarAdmPag1Props = {
    originalCarnet: string | undefined;
}


const EditarAdmPag1 = ({ originalCarnet }: EditarAdmPag1Props) => {

    if (originalCarnet == undefined) {
        return <LoadingSpinner />
    }

    const [carnetValue, setCarnetValue] = useState(originalCarnet);
    const { register, formState: { errors } } = useFormContext<EditarAdmFormType>()
    const { isError } = useQuery(["checkCarnet", carnetValue], () => apiClient.checkCarnet(carnetValue), {
        enabled: !!carnetValue,
        retry: false
    });

    const handleChange = (value: string) => {
        if (value != originalCarnet) {
            setCarnetValue(value);
        }
    }

    return (
        <FormFragmentWrapper title='Informacion Personal Administrativo'>
            <label className='label'>
                Nombre:
                <input type="text" className='input' {...register("nombre", { required: "Este campo es necesario" })} />
                {errors.nombre && (
                    <DisplayError message={errors.nombre.message as string} />
                )}
            </label>
            <label className='label'>
                Apellido Paterno:
                <input type="text" className='input' {...register("appaterno", { required: "Este campo es requerido" })} />
                {errors.appaterno && (
                    <DisplayError message={errors.appaterno.message as string} />
                )}
            </label>
            <label className='label'>
                Apellido Materno:
                <input type="text" className='input' {...register("apmaterno", { required: "Este campo es requerido" })} />
                {errors.apmaterno && (
                    <DisplayError message={errors.apmaterno.message as string} />
                )}
            </label>
            <label className='label'>
                Carnet:
                <input type="text" className='input' {...register("carnet", { required: "Este campo es requerido", onChange: (e) => handleChange(e.target.value) })} />
                {errors.carnet && (
                    <DisplayError message={errors.carnet.message as string} />
                )}
                {isError && carnetValue != originalCarnet && <DisplayError message='Ese Carnet ya esta siendo utilizado' />}
            </label>
            {/* Detecta solito el boton y el submit */}
            <button className='btn' disabled={isError && carnetValue != originalCarnet}>
                Next
            </button>
        </FormFragmentWrapper>
    )
}

export default EditarAdmPag1
