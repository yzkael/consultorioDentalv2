import { useState } from "react"
import { searchPacienteOpciones } from "../../config/config-files"
import { ManejarSearch } from "../../types/app-types"
import SearchBar from "../../components/SearchBar"
import { useQuery } from "react-query"
import * as apiClient from '../../api-client';
import LoadingSpinner from "../../components/LoadingSpinner"
import TablaManejar from "../../components/TablaManejar"

type BuscarPacientesProps = {
    setPacienteSelect: (id: number) => void;
    pacienteSelected: number;
}


const BuscarPacientes = ({ setPacienteSelect, pacienteSelected }: BuscarPacientesProps) => {
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })

    const [shouldSearch, setShouldSearch] = useState(false);

    const { data: pacientes, isLoading } = useQuery(["searchPacientes", searchValues], () => apiClient.searchPacientesAPI(searchValues), {
        enabled: shouldSearch,
        retry: 1,
        refetchOnWindowFocus: false
    })


    const handleSearch = (data: ManejarSearch) => {
        setSearchValues(data);
        setShouldSearch(true);
    }


    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
                    {/* Barra de Busqueda */}
                    <SearchBar options={searchPacienteOpciones} handleSearch={handleSearch} />
                    {/* Tabla de Mostar Pacientes con funcionalidad de Select */}
                    <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
                        {isLoading ? <LoadingSpinner /> :
                            <TablaManejar data={pacientes?.data} differentAttribute="ninguno" paciente={true} selected={pacienteSelected} handleSelect={setPacienteSelect} esSoloVista={true} />
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default BuscarPacientes
