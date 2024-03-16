/**
 * @swagger
 * tags:
 *   name: Grade
 *   description: API endpoints for grade
 */
import express from 'express';
import { handleGetGrades } from '../../controllers/gradeController.js';

const gradeRouter = express.Router();

/**
 * @swagger
 * /api/grade:
 *   get:
 *     summary: Get all grade
 *     tags: [Grade]
 *     responses:
 *       '200':
 *         description: A list of all grade
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
gradeRouter.get('/', handleGetGrades);

export default gradeRouter;
