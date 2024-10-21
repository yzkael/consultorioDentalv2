import { useState } from "react"
import { searchPacienteOpciones } from "../../config/config-files"
import { ManejarSearch } from "../../types/app-types"
import SearchBar from "../SearchBar"
import { useQuery } from "react-query"
import * as apiClient from '../../api-client';
import LoadingSpinner from "../LoadingSpinner"
import TablaManejar from "../TablaManejar"

const BuscarPacientes = () => {
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })
    const [selected, setSelected] = useState<number | undefined>(undefined);

    const { data: pacientes, isLoading } = useQuery(["searchPacientes", searchValues], () => apiClient.searchPacientesAPI(searchValues), {
        enabled: !!searchValues,
        retry: 1,
        refetchOnWindowFocus: false
    })


    const handleSearch = (data: ManejarSearch) => {
        setSearchValues(data);
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
                            <TablaManejar data={pacientes?.data} differentAttribute="ninguno" paciente={true} selected={selected} handleSelect={setSelected} />
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default BuscarPacientes
