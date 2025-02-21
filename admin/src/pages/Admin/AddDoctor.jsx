import { assets } from "../../assets/assets";
import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setdocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { aToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not seleceted");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("degree", degree);
      formData.append("speciality", speciality);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const data = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      console.log(data.data);
      if (data.data.success) {
        toast.success(data.data.message);
        setdocImg(false)
        setName('')
        setPassword('')
        setAbout('')
        setDegree('')
        setFee('')
        setAddress1('')
        setAddress2('')
      } else {
        toast.error(data.data.message);
      }
  
    } catch (error) {
       toast.error(error.message);
      console.log(error)
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div
        className="bg-white px-8  py-8 border  border-gray-100 rounded max-w-4xl
      max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setdocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm">
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor email</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                name=""
                id=""
                className="border border-gray-200 rounded px-3 py-2"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Fee</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="number"
                placeholder="Fee"
                required
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Speciality</p>
              <select
                className="border border-gray-200 rounded px-3 py-2"
                name=""
                id=""
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Education</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Address1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Address2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full border border-gray-200 rounded px-4 pt-2"
            placeholder="write about doctor"
            rows={5}
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          {" "}
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
