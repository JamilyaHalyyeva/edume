import express from 'express';
import {
  handleRegister,
  handleLogin,
  handleForgotPassword,
} from '../../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/register', handleRegister);
authRouter.post('/login', handleLogin);
authRouter.post('/forgotpassword', handleForgotPassword);

export default authRouter;
