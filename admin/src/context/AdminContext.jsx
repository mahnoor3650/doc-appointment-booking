import { createContext, useState } from "react";
export const AdminContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";
const AdimContextProvider = (props) => {
  const [aToken, setaToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [appointmnets, setAppointmnets] = useState([]);
  const [dashData, setDashData] = useState(false);
  const getALldoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        console.log(data.doctors);
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const changeAvailabilty = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availabilty",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getALldoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointmnets", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointmnets(data.appointments);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error);
    }
  };
  const cancelAppointmnet = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
   const getDashboradData = async () => {
     try {
       const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
         headers: { aToken },
       });
       if (data.success) {
         setDashData(data.dashData);
       } else {
         toast.error(data.message);
       }
     } catch (error) {
       console.log(error);
       toast.error(error.message);
     }
   };
  const value = {
    aToken,
    setaToken,
    backendUrl,
    doctors,
    getALldoctors,
    changeAvailabilty,
    appointmnets,
    getAllAppointments,
    setAppointmnets,
    cancelAppointmnet,
    dashData,
    getDashboradData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdimContextProvider;
