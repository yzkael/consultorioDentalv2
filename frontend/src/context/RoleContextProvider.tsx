import { useContext, createContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';

type AuthContextType = {
    userId: string;
    tipoEmpleado: string;
};

const RoleContext = createContext<AuthContextType | undefined>(undefined);


const RoleContextProvider = () => {

    const { data } = useQuery("revisarEmpleado", apiClient.checkJWT, {
        retry: 1
    });

    console.log(data);

    return (
        <div>

        </div>
    )
}

export default RoleContextProvider
