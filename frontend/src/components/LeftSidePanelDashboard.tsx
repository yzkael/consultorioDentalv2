import { Link } from "react-router-dom";

const LeftSidePanel = () => {
  return (
    <div className="h-full w-full bg-pink-400 flex flex-col p-10 justify-between font-bold text-2xl text-white">
      <Link to={"/empleados"} className="hover:text-slate-200">
        Medicamentos
      </Link>
      <Link to={"/factuas"} className="hover:text-slate-200">
        Facturas
      </Link>
      <Link to={"/consultas"} className="hover:text-slate-200">
        Consultas
      </Link>
      <Link to={"/logout"} className="self-end hover:text-slate-200">
        Logout
      </Link>
    </div>
  );
};

export default LeftSidePanel;
