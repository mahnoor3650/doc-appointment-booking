import { createContext } from "react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setdToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointmnets, setAppointmnets] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const getDocAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        setAppointmnets(data.appointments.reverse());
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
        backendUrl + "/api/doctor/cancel",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDocAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const completeAppointmnet = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDocAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const getDashboradData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
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
   const getProfileData = async () => {
     try {
       const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
         headers: { dToken },
       });
       if (data.success) {
         setProfileData(data.profileData);
       } else {
         toast.error(data.message);
       }
     } catch (error) {
       console.log(error);
       toast.error(error.message);
     }
   };
  const value = {
    dToken,
    setdToken,
    backendUrl,
    appointmnets,
    getDocAppointments,
    cancelAppointmnet,
    completeAppointmnet,
    dashData,
    getDashboradData,
    profileData,setProfileData,
    getProfileData
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
