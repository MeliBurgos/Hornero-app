import { useState } from "react";
import { Button } from "react-bootstrap";

import ReserveModal from "./ReserveModal";

const Workplace = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      Este componente deberia ser 1 solo puesto de trabajo.
      {/* Cuando se clickea deberia abrir un modal para hacer las reservas, etc */}
      <Button variant="primary" onClick={()=>setShow(true)}>
        Lugar de trabajo
      </Button>
      <ReserveModal show={show} setShow={setShow} />
    </>
  );
};

export default Workplace;
