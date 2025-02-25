import express from "express";
import { appointmentCancel, appointmentComplete, doctorsList, getDoctorAppointments, loginDoctor } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authdoctor.js";


const doctorRouter = express.Router();
doctorRouter.get("/list",doctorsList);
doctorRouter.get("/appointments",authDoctor,getDoctorAppointments);
doctorRouter.post('/login',loginDoctor);
doctorRouter.post('/complete',authDoctor,appointmentComplete);
doctorRouter.post('/cancel',authDoctor,appointmentCancel);


export default doctorRouter;
