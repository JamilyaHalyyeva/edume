import express from 'express';
import {
  handleRegister,
  handleLogin,
  handleForgotPassword,
  handleChangeForgotPassword,
} from '../../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/register', handleRegister);
authRouter.post('/login', handleLogin);
authRouter.post('/forgotpassword', handleForgotPassword);
authRouter.patch('/changeforgotpassword', handleChangeForgotPassword);

export default authRouter;
