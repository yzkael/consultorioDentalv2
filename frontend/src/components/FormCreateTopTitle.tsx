import { Link } from "react-router-dom";
import imgLogo from "../assets/tooth.png";

const FormCreateTopTitle = () => {
  return (
    <div className="relative h-1 md:h-full md:absolute flex justify-between px-10  items-center top-4 w-full object-contain md:max-h-[15vh]">
      <Link
        to={"/dashboard"}
        className="py-3 text-white font-semibold hover:bg-purple-400 px-2 bg-purple-500 rounded-lg"
      >
        Menu
      </Link>
      <h1 className="text-blue-900 font-bold text-3xl mb-0 md:mb-10">
        Crear Dentista
      </h1>
      <img src={imgLogo} className="w-max h-max max-h-[3rem] md:max-h-[5rem]" />
    </div>
  );
};

export default FormCreateTopTitle;
