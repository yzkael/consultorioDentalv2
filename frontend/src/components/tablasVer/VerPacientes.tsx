import { ManejarPacienteType } from "../../types/app-types"

type VerPacientesProps = {
    pacientes: ManejarPacienteType;
    handleClick: (idPaciente: number) => void;
}


const VerPacientes = ({ pacientes, handleClick }: VerPacientesProps) => {
    //Para quen o joda
    console.log(pacientes, handleClick(1));
    return (
        <div>

        </div>
    )
}

export default VerPacientes
