import imgLogin from "../assets/dentistaLogin.png";
import LoginForm from "../forms/LoginForm";
const Login = () => {
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
