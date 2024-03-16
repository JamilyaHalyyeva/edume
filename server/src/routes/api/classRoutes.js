/**
 * @swagger
 * tags:
 *   name: Class
 *   description: API endpoints for class
 */
import express from 'express';
import { handleGetClasses } from '../../controllers/classController.js';

const classRouter = express.Router();

/**
 * @swagger
 * /api/class:
 *   get:
 *     summary: Get all class
 *     tags: [Class]
 *     responses:
 *       '200':
 *         description: A list of class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   value:
 *                     type: string
 *       '500':
 *         description: Internal server error
 */
classRouter.get('/', handleGetClasses);

export default classRouter;
