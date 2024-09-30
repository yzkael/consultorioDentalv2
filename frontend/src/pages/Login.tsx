import imgLogin from "../assets/dentistaLogin.png";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';
import { useNavigate } from "react-router-dom";
import { LoginFormType } from "../types/app-types";
import LoginForm from "../forms/LoginForm";
import { useToast } from "../context/ToastContextProvider";

const Login = () => {

  const { notifyError, notifySuccess } = useToast();

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation("signUp", apiClient.signUp, {
    onSuccess: () => {
      notifySuccess("Bienvenido de vuelta!")
      navigate("/dashboard");
    },
    onError: () => {
      notifyError("Usuario o contrasenha incorrectos!");
    }
  })
  const onSave = (data: LoginFormType) => {
    mutate(data);
  }
  return (
    // Body
    <div className="flex flex-col h-screen bg-loginBgPink">
      {/* Main Segmentation of the Body */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] h-screen">
        {/* Image Div */}
        <div className="h-screen w-full object-cover hidden md:block">
          <img src={imgLogin} className="h-full w-full object-cover" />
        </div>
        {/* Login Form */}
        <div className="h-full  w-full">
          <LoginForm onSave={onSave} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Login;
