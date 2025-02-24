import express from 'express'
import { bookAppointment, cancelAppointment, getAppointmentList, getUserProfile, loginUser, paymentRazorPay, registerUser, updateUserProfle, verifyRazorPay } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser);
userRouter.get('/get-profile',authUser,getUserProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateUserProfle);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/appointment-list',authUser,getAppointmentList);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/pay-online", authUser, paymentRazorPay);
userRouter.post("/verifyRazorPay", authUser, verifyRazorPay);
export default userRouter;