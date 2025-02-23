import express from 'express'
import { bookAppointment, getUserProfile, loginUser, registerUser, updateUserProfle } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser);
userRouter.get('/get-profile',authUser,getUserProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateUserProfle);
userRouter.post('/book-appointment',authUser,bookAppointment);
export default userRouter;