import { useParams } from "react-router-dom";
import Workplace from "../commons/Workplace";

const Office = () => {
  const {officeName} = useParams();

  // regex para cambiar mar_del_plata ==> Mar Del Plata
  const officeNameOk = officeName.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()});
  
  // if(noEstaLogueado) return (
  //   <>
  //   Tenes que loguearte primero
  //   boton --> /login
  //   </>
  // )

  return (
    <>
      Office
      {/* Aca va el render de la oficina con los cuadraditos clickeables */}
      {/* Desde el officeName veo cuantos puestos tengo que renderizar */}
      <Workplace /> {/* Renderizar 1 workplace por cada lugar disponible */}
    </>
  );
};

export default Office;
