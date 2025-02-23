import express from 'express'
import { bookAppointment, cancelAppointment, getAppointmentList, getUserProfile, loginUser, registerUser, updateUserProfle } from '../controllers/userController.js';
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
export default userRouter;