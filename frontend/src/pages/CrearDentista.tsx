import { useMutation } from "react-query";
import ManageDentistaForm from "../forms/CrearDentistaFormv2/ManageDentistaForm";
import { CrearDentistaFormType } from "../types/app-types";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContextProvider";
const CrearEmpleado = () => {
  const { notifyError, notifySuccess } = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    "crearDentista",
    apiClient.crearDentista,
    {
      onError: (errors: Error) => {
        notifyError("Formato de datos invalido");
      },
      onSuccess: () => {
        notifySuccess("Dentista creado exitosamente!")
        navigate("/empleados/administrar/dentistas");
      },
    }
  );

  const handleSave = (dentistaFormData: CrearDentistaFormType) => {
    mutate(dentistaFormData);
  };

  return <ManageDentistaForm onSave={handleSave} />;
};

export default CrearEmpleado;
