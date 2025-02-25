import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorConext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
const DoctorAppointmnet = () => {
  const { dToken, appointmnets, getDocAppointments ,cancelAppointmnet,
    completeAppointmnet} =
    useContext(DoctorContext);
      const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getDocAppointments();
    }
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div
        className="bg-white border border-gray-200 rounded text-sm max-h-[80vh]
        overflow-y-scroll min-h-[50vh]"
      >
        <div
          className="hidden sm:grid 
          grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6
          border-b border-gray-200"
        >
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointmnets.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2
            sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b 
            hover:bg-gray-50 border-gray-200 "
            key={index}
          >
            <p className="max-sm:hidden"> {index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className=" text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p>cancelled</p>
            ) : item.isCompleted ? (
              <p>Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointmnet(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointmnet(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointmnet;
