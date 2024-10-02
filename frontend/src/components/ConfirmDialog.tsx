import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

type ConfirmDialogProps = {
    message: string;
    setRespuesta: (respuesta: boolean) => void;
    setActive: (estado: boolean) => void; //Manejan la visibilidad
    isActive: boolean;//Visibilidad
    reactClick: (response: boolean) => void; //Manejara la query del delete

}

const ConfirmDialog = ({ message, setRespuesta, isActive, setActive, reactClick }: ConfirmDialogProps) => {
    const styleHidden = "hidden";
    const styleVisible = 'w-[60vw] h-[60vh] md:w-[20vw] md:h-[20vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-500 shadow-lg p-4 rounded'
    const handleClick = (value: boolean) => {
        setRespuesta(value);
        setActive(!isActive);
        reactClick(value);
    }
    return (
        <div className={isActive ? styleVisible : styleHidden}>
            <div className="flex justify-center items-center text-black font-bold text-center ">
                {message}
            </div>
            <div className="flex justify-around  py-4">
                <button onClick={() => handleClick(true)}>
                    <FaCheck size={20} />
                </button>
                <button onClick={() => handleClick(false)}>
                    <FaXmark size={20} />
                </button>
            </div>
        </div>
    )
}

export default ConfirmDialog
