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

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/office/:officeName" element={<Office />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
