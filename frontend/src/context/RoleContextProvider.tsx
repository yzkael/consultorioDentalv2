import { useContext, createContext, ReactNode } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';

export type AuthContextType = {
    userId: string | null;
    role: string | null;
    tipoEmpleado: string | null;
    isLoggedIn: boolean;
};

export type JwtPayload = {
    userId: string;
    role: string;
    tipoEmpleado: string;
}

const RoleContext = createContext<AuthContextType | undefined>(undefined);


const RoleContextProvider = ({ children }: { children: ReactNode }) => {

    const { data, isError } = useQuery<JwtPayload>("revisarEmpleado", apiClient.checkJWT, {
        retry: 1,
    });


    //Para que no salte Error revisaremos la data y le daremos null en vez de undefined
    const userId = data ? data.userId : null;
    const role = data ? data.role : null;
    const tipoEmpleado = data ? data.tipoEmpleado : null;

    const roleContextValues: AuthContextType = {
        userId, // For createdBy
        role, // For consulta types and.... Maybe.... Protected Routes?
        tipoEmpleado, // For dashboard
        isLoggedIn: !isError //Sino es error entonces significa que esta logeado
    }


    return (
        <RoleContext.Provider value={roleContextValues}>
            {children}
        </RoleContext.Provider>
    );


}

export const useAuth = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("Context should be used within a provider")
    }
    return context;
}

export default RoleContextProvider
