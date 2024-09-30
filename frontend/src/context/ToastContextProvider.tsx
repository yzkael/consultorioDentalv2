import { createContext, useContext, useCallback, ReactNode } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastContextType = {
    notifySuccess: (message: string) => void;
    notifyError: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("Something wrong with context");
    }
    return context;
}


const ToastContextProvider = ({ children }: { children: ReactNode }) => {


    const notifySuccess = useCallback((message: string) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            style: {
                backgroundColor: '#f4d3c2',
                color: '#ff00e0',
                fontWeight: 700,
            },
            progressStyle: {
                backgroundColor: 'black'
            }
        });
    }, []);

    const notifyError = useCallback((message: string) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            style: {
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 700
            },
            progressStyle: {
                backgroundColor: "lightcoral"
            }

        });
    }, []);

    return (
        <ToastContext.Provider value={{ notifySuccess, notifyError }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    )
}


export default ToastContextProvider;