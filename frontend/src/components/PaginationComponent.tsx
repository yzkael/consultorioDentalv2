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

    //Esta parte tendria que venir separada... Creo que hare que devuelva un Count(*) del length del 
    // Search para hacerlo mas facil


    //Hay que crear un array para poder usar el .map en el return
    const totalNumber = Number(numeroDatos);
    const pageNumber: any[] = [];
    let primerPagina = 1;
    for (let index = 0; index < totalNumber; index += limite) {
        pageNumber.push(primerPagina);
        primerPagina++;
    }
    console.log(selected)
    const handleClick = (value: number) => {
        console.log(value);
        setSelected(value);
    }

    const estiloNormal = "p-3 bg-blue-400 cursor-pointer hover:bg-blue-200"
    const estiloSeleccionado = "p-3 bg-blue-900 cursor-pointer hover:bg-blue-200"
    return (
        <div className='w-full flex gap-1 justify-center'>
            {
                pageNumber.map((num) => (
                    <button onClick={() => handleClick(num as number)} className={num === selected ? estiloNormal : estiloSeleccionado}>            {num}
                    </button>
                ))
            }
        </div >
    )
}

export default PaginationComponent
