import express from 'express'
import { addDoctor, allDoctors, loginAdmin } from "../controllers/adminController.js";
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import { chnageAvailabilty } from '../controllers/doctorController.js';


const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin,upload.single("image"), addDoctor);
adminRouter.post("/login",loginAdmin);
adminRouter.post("/all-doctors",authAdmin,allDoctors);
adminRouter.post("/change-availabilty", authAdmin, chnageAvailabilty);
export default adminRouter;