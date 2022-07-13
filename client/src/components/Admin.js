import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
//import { getReservationsAdmin } from "../store/admin"
import { getReservations } from "../store/reservations"
//import { getOffices } from "../store/offices";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let reservas = useSelector((state) => state.reservations)
    //console.log("reservas", reservas)


      useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user")).user.admin) navigate("/");
      }, []);


    useEffect(()=>{
        //axios.get(`/api/reservations/office/62ba20cddff8831087f6af59`)
        //.then((res) => console.log(res.data))
        // dispatch(getReservations())
        // .then((res) => reservas = res)
    },[])

   
  return (
    <>
      <div style={{marginTop:"20%"}}>
        <h1>hola</h1>
        {console.log("ACA", reservas)}
      </div>
    </>
  );
};

export default Admin;