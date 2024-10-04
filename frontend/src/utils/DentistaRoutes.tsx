import React, { ReactNode } from 'react'
import { useAuth } from '../context/RoleContextProvider'
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const DentistaRoutes = ({ children }: { children: ReactNode }) => {

    const location = useLocation();
    const { tipoEmpleado, role } = useAuth();

    //TODO: DEBO EDITAR PARA CUMPLIR CON LAS ESPECIFICACIONES DEL DENTISTA
    if (!tipoEmpleado || !role) {
        return <LoadingSpinner />
    }

    if (tipoEmpleado != "dentista") {
        return <Navigate to={'/'} state={{ from: location }} />
    }
    return children;
}
export default DentistaRoutes
