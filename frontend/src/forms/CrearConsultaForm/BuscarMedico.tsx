import { useState } from "react"
import SearchBar from "../../components/SearchBar"
import { searchDentistaOpciones as searchMedico } from '../../config/config-files'
import { ManejarSearch } from "../../types/app-types"
import { useQuery } from "react-query"
import * as apiClient from '../../api-client';
import LoadingSpinner from "../../components/LoadingSpinner"
import TablaManejar from "../../components/TablaManejar"

// Esta parte tiene que hacerse Yes o Yes debo completar el funcionamiento
// De el seleccionar Medico
//Tengo la idea de tener un buscador  para el medico y seleccionar, para luego todos los Ids tenerlos listos en 
// un objeto para ser enviado al backend

type BuscarMedicoProps = {
    doctorSelected: number;
    setDoctorSelected: (id: number) => void;
}


const BuscarMedico = ({ doctorSelected, setDoctorSelected }: BuscarMedicoProps) => {

    //
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" });
    //
    const [shouldSearch, setShouldSearch] = useState(false);

    const { data: dentistas, isLoading } = useQuery(["searchDentistas", searchValues], () => apiClient.searchDentista(searchValues), {
        enabled: shouldSearch,
        retry: 1,
        refetchOnWindowFocus: false
    })


    const handleSearch = (data: ManejarSearch) => {
        setSearchValues(data);
        setShouldSearch(true);
    }


    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
                {/* Barra de Busqueda */}
                <SearchBar options={searchMedico} handleSearch={handleSearch} />
                {/* Tabla de Mostar Dentistas con funcionalidad de Select */}
                <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
                    {isLoading ? <LoadingSpinner /> :
                        <TablaManejar data={dentistas} differentAttribute="especialidad" selected={doctorSelected} handleSelect={setDoctorSelected} esSoloVista={true} />
                    }
                </div>
            </div>
        </div>

    )
}

export default BuscarMedico
