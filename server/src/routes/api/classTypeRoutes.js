/**
 * @swagger
 * tags:
 *   name: ClassType
 *   description: API endpoints for classType
 */
import express from 'express';
import { handleGetClasses } from '../../controllers/classController.js';

const classTypeRouter = express.Router();

/**
 * @swagger
 * /api/classType:
 *   get:
 *     summary: Get all classTypes
 *     tags: [ClassType]
 *     responses:
 *       '200':
 *         description: A list of classTypes
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
classTypeRouter.get('/', handleGetClasses);

export default classTypeRouter;
