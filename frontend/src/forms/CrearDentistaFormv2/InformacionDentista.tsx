import { useFormContext } from "react-hook-form";
import { CrearDentistaFormType } from "./Example";

const InformacionDentista = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CrearDentistaFormType>();

  return <div className="w-full h-full flex flex-col">Test1</div>;
};

export default InformacionDentista;
