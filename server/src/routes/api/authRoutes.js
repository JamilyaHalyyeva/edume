import express from 'express'
import { handleRegister } from '../../controllers/authController.js'

const authRouter = express.Router()
authRouter.post('/register', handleRegister)

export default authRouter
