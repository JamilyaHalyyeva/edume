/**
 * @swagger
 * tags:
 *   name: GradeClassType
 *   description: API endpoints for classType
 */
import express from 'express';
import {
  handleGetGradeClassTypes,
  handleGetMyGradeClassTypes,
} from '../../controllers/gradeClassTypeController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const gradeClassTypeRouter = express.Router();

/**
 * @swagger
 * /gradeClassType:
 *   get:
 *     summary: Retrieve all grade class types
 *     tags: [GradeClassType]
 *     description: Fetches a list of all grade class types, providing their details.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of grade class types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The grade class type ID.
 *                   name:
 *                     type: string
 *                     description: The name of the grade class type.
 *                   description:
 *                     type: string
 *                     description: The description of the grade class type.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the grade class type was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the grade class type was last updated.
 *       500:
 *         description: Internal server error
 */
gradeClassTypeRouter.get('/', handleGetGradeClassTypes);

gradeClassTypeRouter.get(
  '/myClassTypes',
  authMiddleware,
  handleGetMyGradeClassTypes,
);

export default gradeClassTypeRouter;
