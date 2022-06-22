import "../styles/navbar.css";
import logoSmall from "../images/Short-Original.svg";

const Navbar = () => {
  return (
    <div>
      Navbar
      {/* Logo de Globant. */}
      <img src={logoSmall} alt="logo_small" className="navLogo" />
      {/* Boton login. */}
      {/* Search para elegir oficina o lista desplegable (esto puede estar en la vista de oficina tambien) */}
    </div>
  );
};

export default Navbar;
