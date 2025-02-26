import doctorModel from "../models/doctorModel.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const chnageAvailabilty = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availabilty chnaged" });
  } catch (error) {
    console.log("erroe", error);
    res.json({ success: false, message: error.message });
  }
};
const doctorsList = async(req,res) =>{
  try {
    const doctors = await doctorModel.find({}).select(["-password",'-email']);
    res.json({ success: true, doctors });
  } catch (error) {
     console.log("erroe", error);
     res.json({ success: false, message: error.message });
  }
}

//Api for Doctore Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor does not exits" });
    }
    const ismatch = await bycrypt.compare(password, doctor.password);

    if (ismatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//get Doctor Data
const getDoctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({docId});
   
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// mark appointmnet completed
const appointmentComplete = async (req, res) => {
  try {
    const { docId,appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById( appointmentId );
    if (appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
       res.json({ success: true, message:"Appointment Completed" });
    }else{
          res.json({ success: false, message: "Mark Failed" });
    }
     
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// api to cancel  appointmnet 
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId );
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({ success: true, message: "Appointment cancelled" });
    } else {
      res.json({ success: false, message: "cancellation Failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/// Api for Doctor dashborad
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments= await appointmentModel.find({docId});
    let earnings =0;
    appointments.map((item)=>{
      if(item.isCompleted || item.payment){
        earnings +=item.amount
      }
    })
    let patients =[]
    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }
    })
    const dashData ={
      earnings,appointments: appointments.length,
      patients: patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({ success: true, dashData });
     
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Doctor Data
const getDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update doctor proifle
const updateDoctorProfle = async (req, res) => {
  try {
    const { docId, fee, address, available } = req.body;
  
    await doctorModel.findByIdAndUpdate(docId, {
      fee,
      address,
      available
    });
  
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export {
  chnageAvailabilty,
  doctorsList,
  loginDoctor,
  getDoctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  getDoctorProfile,
  updateDoctorProfle,
};
