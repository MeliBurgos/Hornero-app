import Image from "react-bootstrap/Image"
import Logo from "../images/Globant-Original.svg"

const Footer = () => {
  return (
    <div className="footer" >
      <hr></hr>
      <Image src={Logo} alt='Globant' style={{ width: "30%" }} ></Image>
      <p>Desarrollado por Pablo Barreiro, Melisa Burgos, Fabian Lopez, Matias Nasif y Benjamin Becerra</p>
      <p> © 2022 - All rights reserved. </p>
      <hr></hr>

    </div>

  );
};

export default Footer;
