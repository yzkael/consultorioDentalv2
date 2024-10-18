import { useQuery } from 'react-query'
import * as apiClient from '../api-client'


// Sera usado luego
type PaginationComponentType = {
    numeroDatos: any; //Vendran los datos de la Query en el manejar
    selected: number;  //Para Highlightear el numero Seleccionado
    setSelected: (numSelect: number) => void; //Para cambiar el seleccionado
    limite: number;
}


const PaginationComponent = ({ numeroDatos, selected, setSelected, limite }: PaginationComponentType) => {

    const totalNumber = Number(numeroDatos);
    const pageNumber: any[] = [];
    let primerPagina = 1;
    const NUMEROPAGINASMOSTRAR = 5; //Cantidad Hardcoded que limita el numero de paginas visibles para el usuario

    for (let index = 0; index < totalNumber; index += limite) {
        pageNumber.push(primerPagina);
        primerPagina++;
    }
    const handleClick = (value: number) => {
        setSelected(value);
    }


    const estiloNormal = "p-3 bg-blue-400 cursor-pointer hover:bg-blue-200"
    const estiloSeleccionado = "p-3 bg-blue-900 cursor-pointer hover:bg-blue-200"
    return (
        <div className='w-full flex gap-1 justify-center'>
            {/* Logica para mostrar los botones Primer Pagina */}
            {
                selected == 1 &&
                pageNumber.map((num) => (
                    num <= NUMEROPAGINASMOSTRAR ? (
                        <button
                            key={num}
                            onClick={() => handleClick(num)}
                            className={num === selected ? estiloSeleccionado : estiloNormal}
                        >
                            {num}
                        </button>
                    ) : null
                ))
            }
            {/* Logica para mostrar Botones Resto de paginas */}
            {
                selected != 1 &&
                pageNumber.map((num) => (
                    num <= NUMEROPAGINASMOSTRAR ? (
                        <button
                            key={num}
                            onClick={() => handleClick(num)}
                            className={num === selected ? estiloSeleccionado : estiloNormal}
                        >
                            {num}
                        </button>
                    ) : null
                ))
            }
        </div>
    )
}

export default PaginationComponent
