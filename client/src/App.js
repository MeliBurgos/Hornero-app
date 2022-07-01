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
import CamTest from './components/CamTest';


function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<CamTest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/office/:officeName" element={<Office />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;