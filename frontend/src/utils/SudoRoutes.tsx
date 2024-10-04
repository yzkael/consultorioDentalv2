import { ReactNode } from 'react'
import { useAuth } from '../context/RoleContextProvider'
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const SudoRoutes = ({ children }: { children: ReactNode }) => {

    const location = useLocation();
    const { tipoEmpleado, role } = useAuth();
    const compareRoleVar = Number(role);

    if (!tipoEmpleado || !role) {
        return <LoadingSpinner />
    }

    if (tipoEmpleado != "administrativo") {
        return <Navigate to={'/'} state={{ from: location }} />

    }

    if (compareRoleVar != 4) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    return children;

}

export default SudoRoutes
