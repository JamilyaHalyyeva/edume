/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

import express from 'express';
import {
  handleRegister,
  handleLogin,
  handleForgotPassword,
  handleChangeForgotPassword,
} from '../../controllers/authController.js';

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               avatar:
 *                type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request or user already exists
 */
authRouter.post('/register', handleRegister);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login as an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid credentials or user not found
 */
authRouter.post('/login', handleLogin);

/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Request to reset forgotten password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset email sent successfully
 *       '400':
 *         description: Bad request or user not found
 */
authRouter.post('/forgotpassword', handleForgotPassword);

/**
 * @swagger
 * /api/auth/changeforgotpassword:
 *   patch:
 *     summary: Change password after resetting
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '400':
 *         description: Bad request or token expired
 */
authRouter.patch('/changeforgotpassword', handleChangeForgotPassword);

export default authRouter;
