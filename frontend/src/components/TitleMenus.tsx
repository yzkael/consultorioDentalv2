import Logout from "./buttons/Logout";
import MenuButton from "./buttons/MenuButton";
import { useLocation } from "react-router-dom";

type TitleProps = {
  title: string;
};

//Utilizar el useAuth para cambiar de logout a menu botton!
// 


const TitleMenus = ({ title }: TitleProps) => {

  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <div className=" bg-slate-500 w-full h-[15vh] border-b-2 border-slate-700  flex justify-around items-center max-h-[10vh]">
      <div className="invisible">adsa</div>
      <div className="text-white font-bold tracking-tight text-3xl">
        {title}
      </div>
      {isMainPage ? <Logout /> : <MenuButton />}

    </div>
  );
};

export default TitleMenus;
