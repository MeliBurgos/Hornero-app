import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaUserLock, FaUser } from "react-icons/fa";

import ProfileModal from "./ProfileModal";
import { promoteUserToAdmin, removeUserToAdmin, getAllUsers } from "../store/admin";
import useInput from "../hooks/useInput";

const Admin = ({ setShow, setAddFriend }) => {
  const dispatch = useDispatch();
  const searchUsers = useInput();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const allUsers = useSelector((state) => state.admin);
  const showedUsers = searchUsers.value.length >= 3 ? filteredUsers : allUsers;
  const darkMode = useSelector((state) => state.darkMode);
  const [profile, setProfile] = useState(false);

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

  useEffect(()=> {
    dispatch(getAllUsers())
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
        ? newUsersList.push(user) : null}
      )
      setFilteredUsers(newUsersList)
    }
  }, [searchUsers.value, allUsers]);

  if (profile) {
    return <ProfileModal profile={profile} setProfile={setProfile} />;
  }

  return (
    <div style={{marginTop:"20%"}}>
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
          className={darkMode ? "dark-mode" : "light"}
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
                    <FaUserLock
                      style={{ cursor: "pointer" }}
                      size={28}
                      onClick={() => handleRemoveAdmin(user._id)}
                    />: <FaUser 
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
      
      <div>
        <button
          className={darkMode ? "dark-mode-black-button" : "main-button-black"}
          onClick={() => setAddFriend(false)}
        >
          Volver
        </button>
        <button
          className={darkMode ? "dark-mode-black-button" : "main-button-black"}
          onClick={() => {
            setShow(false);
            setAddFriend(false);
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Admin;
