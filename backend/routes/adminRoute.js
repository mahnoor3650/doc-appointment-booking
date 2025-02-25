import express from 'express'
import { addDoctor, adminDashboard, allDoctors, appointmentcancel, appointmentsAdmin, loginAdmin } from "../controllers/adminController.js";
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import { chnageAvailabilty } from '../controllers/doctorController.js';


const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin,upload.single("image"), addDoctor);
adminRouter.post("/login",loginAdmin);
adminRouter.post("/all-doctors",authAdmin,allDoctors);
adminRouter.post("/change-availabilty", authAdmin, chnageAvailabilty);
adminRouter.get('/appointmnets',authAdmin,appointmentsAdmin);
adminRouter.get('/dashboard',authAdmin,adminDashboard);
adminRouter.post("/cancel-appointment", authAdmin, appointmentcancel);
export default adminRouter;