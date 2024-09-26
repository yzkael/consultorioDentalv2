import { ReactNode } from "react";

type FormFragmentWrapperProps = {
    title: string;
    children: ReactNode;
}



const FormFragmentWrapper = ({ title, children }: FormFragmentWrapperProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className=" bg-slate-500 flex justify-center items-center h-5">
                {title}
            </div>
            {children}
        </div>
    )
}

export default FormFragmentWrapper
