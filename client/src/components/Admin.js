import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaKey, FaUser } from "react-icons/fa";

import ProfileModal from "./ProfileModal";
import { promoteUserToAdmin, removeUserToAdmin, getAllUsers } from "../store/admin";
import { getAllFutureReservations } from "../store/reservations";
import useInput from "../hooks/useInput";

import { PieChart, Pie, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';



const Admin = ({ setShow, setAddFriend }) => {
  const dispatch = useDispatch();
  const searchUsers = useInput();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const allUsers = useSelector((state) => state.admin);
  const showedUsers = searchUsers.value.length >= 3 ? filteredUsers : allUsers;
  const darkMode = useSelector((state) => state.darkMode);
  const reservations = useSelector((state) => state.reservations);
  const [profile, setProfile] = useState(false);
  const [utilidad, setUtilidad] = useState('')

  const handleSetAdmin = (id) => {
    dispatch(promoteUserToAdmin(id)).then(() => {
      dispatch(getAllUsers());
    });
  };

  const handleRemoveAdmin = (id) => {
    dispatch(removeUserToAdmin(id)).then(() => {
      dispatch(getAllUsers());
    });
  };

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllFutureReservations())
  }, [])

  // buscar usuarios para agregar
  useEffect(() => {
    if (searchUsers.value.length >= 2) {
      let newUsersList = []
      let searchLowerCase = searchUsers.value.toLowerCase();
      allUsers.forEach((user) => {
        let fullName = `${user.name} ${user.surname}`
        return fullName.toLowerCase().includes(searchLowerCase)
          ||
          user.mainOffice.toLowerCase().includes(searchLowerCase)
          ? newUsersList.push(user) : null
      }
      )
      setFilteredUsers(newUsersList)
    }
  }, [searchUsers.value, allUsers]);
 


  if (profile) {
    return <ProfileModal profile={profile} setProfile={setProfile} />;
  }

  return (
    <>
      <div className="text-center" style={{ marginTop: "20%" }} >
        <button onClick={() => setUtilidad('admin')} className='main-button mx-2'>Administrar Permisos</button>

        <button onClick={() => setUtilidad("reportes")} className='main-button mx-2'>Reportes</button>
      </div>

      {utilidad === "admin" &&
        <div className="p-4" >
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className={darkMode ? "dark-mode-input" : "main-input"}
              type="text"
              {...searchUsers}
              placeholder="Escribe el nombre y/o apellido"
            />
          </form>
          <Table
            style={{ fontFamily: "heeboregular", fontWeigth: 700 }}
            className={darkMode ? "dark-mode mt-2" : "light mt-2"}
            responsive
            hover
            size="sm"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Trabaja en</th>
              </tr>
            </thead>
            <tbody>
              {showedUsers[0] && showedUsers.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td
                    onClick={() => setProfile(user)}
                  >{`${user.name} ${user.surname}`}</td>
                  <td>{user.mainOffice}</td>
                  {showedUsers.includes(user._id) ? (
                    <td />
                  ) : (
                    <td>
                      {user.admin ?
                        <FaKey
                          style={{ cursor: "pointer" }}
                          size={28}
                          onClick={() => handleRemoveAdmin(user._id)}
                        /> : <FaUser
                          style={{ cursor: "pointer" }}
                          size={28}
                          onClick={() => handleSetAdmin(user._id)}
                        />}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>}

      {reservations && utilidad === "reportes" &&
        <>
          <h1>Total de reservas:</h1>

          <PieChart width={730} height={250}>
            <Pie data={[{"name": "Ocupado", "value": reservations.length},{"name": "Libre", "value": 500-reservations.length}]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
          </PieChart>

        </>
      }

    </>
  );
};

export default Admin;
