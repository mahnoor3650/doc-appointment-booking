import express from "express";
import { appointmentCancel, appointmentComplete, doctorDashboard, doctorsList, getDoctorAppointments, getDoctorProfile, loginDoctor, updateDoctorProfle } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authdoctor.js";


const doctorRouter = express.Router();
doctorRouter.get("/list",doctorsList);
doctorRouter.get("/appointments",authDoctor,getDoctorAppointments);
doctorRouter.post('/login',loginDoctor);
doctorRouter.post('/complete',authDoctor,appointmentComplete);
doctorRouter.post('/cancel',authDoctor,appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
doctorRouter.get('/profile',authDoctor,getDoctorProfile);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfle)


export default doctorRouter;
