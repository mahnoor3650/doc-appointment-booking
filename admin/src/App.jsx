import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/adminContext";
import Navbar from './components/Navbar';
const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App
