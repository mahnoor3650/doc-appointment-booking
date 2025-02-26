import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorConext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken,backendUrl, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

    const updateDoctorProfile = async () => {
      try {
        const updatedData ={
          address :profileData.address,
          fee:profileData.fee,
          available:profileData.available
        }

        
        const { data } = await axios.post(
          backendUrl + "/api/doctor/update-profile",
          updatedData,
          { headers: { dToken } }
        );
  
        if (data.success) {
  
          toast.success(data.message);
           setIsEdit(false);
          await getProfileData();

         
        
        } else {
        
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg "
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border border-gray-100 text-sm rounded-full">
                {profileData.experience}
              </button>
            </div>

            <div c>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((pre) => ({ ...pre, fee: e.target.value }))
                    }
                    value={profileData.fee}
                  />
                ) : (
                  profileData.fee
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((pre) => ({
                        ...pre,
                        address: { ...pre.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}{" "}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((pre) => ({
                        ...pre,
                        address: { ...pre.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                name=""
                id=""
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((pre) => ({
                    ...pre,
                    available: !pre.available,
                  }))
                }
              />
              <label htmlFor="">available</label>
            </div>
            {isEdit ?
            <button
              onClick={updateDoctorProfile}
              className=" px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Save
            </button>:
            <button
              onClick={() => setIsEdit(true)}
              className=" px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
