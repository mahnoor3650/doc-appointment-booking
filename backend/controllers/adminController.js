import { v2 as cloudinary } from "cloudinary";
import validator from'validator';
import bycrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
//API for adding doctor

const addDoctor=async(req,res)=>{
    try {
      const {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fee,
        address,
      } = req.body;
      const imageFile = req.file;
      // checking for all data to add doctor
      if (
        !name ||
        !email ||
        !password ||
        !speciality ||
        !degree ||
        !experience ||
        !about ||
        !fee ||
        !address
      ) {
        return res.json({ sucess: false, message: "Missing details" });
      }
      // validating email format
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Pleses Enter a valid email",
        });
      }
      // validating password format
      if (password.length <8) {
        return res.json({
          success: false,
          message: "Pleses Enter a a strong password",
        });
      }
      //hashing password
      const salt = await bycrypt.genSalt(10)
      const hashedPassword = await bycrypt.hash(password,salt);

      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{
        resource_type:'image'
      })
      const imageUrl = imageUpload.secure_url;

      const doctorData = {
        name,email,image:imageUrl,password:hashedPassword,
        speciality,degree,experience,about,fee,address:JSON.parse(address),
        date: Date.now()
      }
      const newDoctor = new doctorModel(doctorData)
      await newDoctor.save();
      res.json({success:true, message:"Doctor added"})



    } catch (error) {
     console.log("erroe",error)
     res.json({success:false,message:error.message})
    }
}

//APi for admin login
const loginAdmin=async(req,res)=>{
  try {
    const { email,password}= req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({success:true,token})
    }else{
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
     console.log("erroe", error);
     res.json({ success: false, message: error.message });
  }

}
const allDoctors =async(req,res)=>{
try {
  
  const doctors = await doctorModel.find({}).select('-password');
  res.json({ success: true, doctors });
} catch (error) {
  console.log("erroe", error);
  res.json({ success: false, message: error.message });
}
}

// API to get all Appointmmets list
const appointmentsAdmin =async(req,res)=>{
try {
  
  const appointments = await appointmentModel.find({});
  res.json({ success: true, appointments });
} catch (error) {
  console.log("erroe", error);
  res.json({ success: false, message: error.message });
}
}

// API for cancel Appointment
const appointmentcancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
 
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    const { docId, slotDate, slotTime } = appointmentData;
    const doctoeData = await doctorModel.findById(docId);
    let slots_booked = doctoeData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointmnet cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentcancel,
};