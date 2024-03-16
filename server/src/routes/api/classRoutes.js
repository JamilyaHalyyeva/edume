/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for classes
 */
import express from 'express';
import { handleGetClasses } from '../../controllers/classController.js';

const classRouter = express.Router();

/**
 * @swagger
 * /api/class:
 *   get:
 *     summary: Get all classes
 *     tags: [Class]
 *     responses:
 *       '200':
 *         description: A list of classes
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
