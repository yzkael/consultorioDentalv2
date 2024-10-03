import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../../api-client'
import { useNavigate } from "react-router-dom"
import { useToast } from "../../context/ToastContextProvider";

const Logout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { notifyError, notifySuccess } = useToast();


    const { mutate } = useMutation("logout", apiClient.logout, {
        onSuccess: () => {
            navigate('/');
            //Invalida la query utilziada en el contexto
            //Para reiniciar el formato de la pagina a el estado deslogeado
            //Debe tener el nombre del a query utilizada
            queryClient.invalidateQueries("revisarEmpleado");
            notifySuccess("Sesion Cerrada exitosamente");
        },
        onError: () => {
            notifyError("Error al cerrar sesion. Porfavor intentalo mas tarde..");
        }
    })

    const handleClick = () => {
        mutate();
    }

    return (
        <button className="btn" onClick={() => handleClick()}>
            Logout
        </button>
    )
}

export default Logout
