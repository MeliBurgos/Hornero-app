import './styles/general.css'
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Office from "./components/Office";
import Login from "./components/Login";
import Register from "./components/Register";
import NavigationBar from './components/Navbar';
import EditProfile from "./components/EditProfile";

let user = {
name: 'Benjamin',
surname: 'Becerra',
email: 'benjabecerra@globant.com',
mainofice: 'North Park, Buenos Aires',
cel: 1127202856,
charge: 'Junior Dev.',
friends: [{name: "Pablo Barreiro"},{name: "Meli Burgos"},{name: "Fabian Lopez"},{name: "Matias Nasif"}],
favofice: [{name: "North Park, Buenos Aires"}],
favdesk: [{name: "F1D2"},{name:"F2D20"}],
photo: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
admin: false
}

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home name={user.name}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={user}/>} />
        <Route path="/editprofile" element={<EditProfile user={user}/>} />
        <Route path="/office/:officeName" element={<Office />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
  
export default App;