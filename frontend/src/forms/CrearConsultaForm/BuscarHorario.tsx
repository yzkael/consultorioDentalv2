import { useQuery } from "react-query";
import * as apiClient from '../../api-client'
import LoadingSpinner from "../../components/LoadingSpinner";

type BuscarHorarioProps = {
    medicoSelect: number;
    setHoraSelect: (id: number) => void;
    fechaSelect: Date | string;
    setFechaSelect: (fecha: Date | string) => void;
}


const BuscarHorario = ({ medicoSelect, setHoraSelect, fechaSelect, setFechaSelect }: BuscarHorarioProps) => {
    // Fecha para la useQuery de los horarios

    const { data: horarios, isLoading } = useQuery(["getHorarios", { fecha: fechaSelect, medico: medicoSelect }], () => apiClient.getHorariosDisponibles({ fecha: fechaSelect, medico: medicoSelect }), {
        enabled: !!fechaSelect,
        retry: 1,
        refetchOnWindowFocus: false
    });

    const handleChange = (value: number) => {
        setHoraSelect(value);
    }

    const handleInput = (value: Date | string) => {
        setFechaSelect(value)
    }


    return (
        <div className="flex h-full bg-slate-500  flex-col items-center justify-around ">
            {/* Input de fecha */}
            <div className="text-white w-full text-2xl font-bold text-center flex flex-col items-center justify-center gap-2">
                Para que fecha te gustaria?
                <input type="date" className="text-black w-[50%]" onChange={(e) => handleInput(e.target.value)} />
            </div>
            {/* Input de horarios disponibles */}
            <div className="text-white w-full text-2xl font-bold text-center flex flex-col items-center justify-center gap-2 -mt-20">
                Selecciona el horario para la fecha
                <select className="text-black" onChange={(e) => handleChange(Number(e.target.value))}>
                    {isLoading || !horarios ? <LoadingSpinner /> :
                        horarios?.map(e => (
                            <option value={e.id_horario}>{e.hora}</option>
                        ))}
                </select>
            </div>
        </div>
    )
}

export default BuscarHorario
