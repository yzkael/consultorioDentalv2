import { useAuth } from "../context/RoleContextProvider";
import AdmDashboard from "../dashboards/AdmDashboard";
import DentistaDashboard from "../dashboards/DentistaDashboard";
import SudoDashboard from "../dashboards/SudoDashboard";

const Dashboard = () => {

  const { tipoEmpleado, role } = useAuth();

  console.log(role);
  console.log(tipoEmpleado);
  //"adminsitrativo" o "dentista" 
  //Para no complicarme la vida voy a crear un role especial para el sudo Admin 
  //Es decir existira doble checking para el administrativo
  //Seria buena idea crear una opcion Ver que solamente permita observar los datos... Esta seria una diferencia clave con el Administrar  
  return (
    <>
      {(tipoEmpleado == "administrativo" && role != "4") && <AdmDashboard />}
      {tipoEmpleado == "dentista" && <DentistaDashboard />}
      {(tipoEmpleado == "administrativo" && role == "4") && <SudoDashboard />}
    </>
  );
};

export default Dashboard;
