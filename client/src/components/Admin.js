import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
//import { getReservationsAdmin } from "../store/admin"
import { getReservations } from "../store/reservations"
//import { getOffices } from "../store/offices";
import axios from "axios"

const Admin = () => {

    const dispatch = useDispatch()
    let reservas = useSelector((state) => state.reservations)
    //console.log("reservas", reservas)


    useEffect(()=>{
        //axios.get(`/api/reservations/office/62ba20cddff8831087f6af59`)
        //.then((res) => console.log(res.data))
        dispatch(getReservations())
        .then((res) => reservas = res)
    },[])

   
  return (
    <>
        <h1>hola</h1>
        {console.log("ACA", reservas)}
    </>
  );
};

export default Admin;