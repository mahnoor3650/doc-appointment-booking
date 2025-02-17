import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "rixhraedjames@gmail.com",
    phone: "+0823276643",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });
  const [isedit, setIsEdit] = useState(false);
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />
      {isedit ? (
        <input
          className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((pre) => ({ ...pre, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Email Id:</p>
        <p className="text-blue-500">{userData.email}</p>
        <p className="font-medium">Phone:</p>
        {isedit ? (
          <input
            type="text"
            className="bg-gray-100  max-w-52"
            value={userData.phone}
            onChange={(e) =>
              setUserData((pre) => ({ ...pre, phone: e.target.value }))
            }
          />
        ) : (
          <p className="text-blue-500">{userData.phone}</p>
        )}
        <p className="font-medium">Address:</p>
        {isedit ? (
          <p>
            {" "}
            <input
              type="text"
              className="bg-gray-50"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData((pre) => ({
                  ...pre,
                  address: { ...pre.address, line1: e.target.value },
                }))
              }
            />
            <br />
            <input
              type="text"
              className="bg-gray-50"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((pre) => ({
                  ...pre,
                  address: { ...pre.address, line2: e.target.value },
                }))
              }
            />
          </p>
        ) : (
          <p className="text-gray-500">
            {userData.address.line1} <br /> {userData.address.line2}
          </p>
        )}
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isedit ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isedit ? (
            <input
              type="date"
              className="max-w-28 bg-gray-100"
              value={userData.dob}
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isedit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all "
            onClick={() => setIsEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
