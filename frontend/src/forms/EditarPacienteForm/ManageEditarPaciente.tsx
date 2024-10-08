import LoadingSpinner from "../../components/LoadingSpinner";
import { ManejarEditarPacienteType } from "../../types/app-types";


type ManageEditarPacienteProps = {
    pacienteData: ManageEditarPacienteProps | null;
    isFetching: boolean;
    isUpdating: boolean;
    onSave: (data: ManejarEditarPacienteType) => void;
}





const ManageEditarPaciente = ({ pacienteData, isFetching, isUpdating, onSave }: ManageEditarPacienteProps) => {

    if (!pacienteData) {
        <LoadingSpinner />
    }

    if (isFetching) {
        <LoadingSpinner />
    }

    if (isUpdating) {

    }



    return (
        <div>

        </div>
    )
}

export default ManageEditarPaciente
