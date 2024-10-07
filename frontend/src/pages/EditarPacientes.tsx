import { useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import { useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";


const EditarPacientes = () => {

    const { idPaciente } = useParams();
    const { data: paciente, isLoading } = useQuery(["getPaciente", idPaciente], () => apiClient.getSinglePaciente(idPaciente as string), {
        retry: 1
    });
    //Sacar informacion para popular los campos
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            Hello
        </div>
    )
}

export default EditarPacientes
