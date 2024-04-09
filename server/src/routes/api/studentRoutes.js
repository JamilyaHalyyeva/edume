/**
 * @swagger
 * tags:
 *   name: Student
 *   description: API endpoints for  student users
 * components:
 *  schemas:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *
 */
import express from 'express';
import {
  getUnregistedClassTypes,
  getTeacherListByClassTypeAndGrade,
} from '../../controllers/studentController.js'; // Adjust the path to your controller file

import authMiddleware from '../../middlewares/authMiddleware.js';

const studentRouter = express.Router();

/**
 * @swagger
 * /api/students/listUnregistedClassTypes:
 *   get:
 *     summary: Get list of unregistered class types
 *     tags: [Student]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClassType'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Class types not found
 *     security:
 *       - bearerAuth: []
 */
studentRouter.get(
  '/listUnregistedClassTypes',
  authMiddleware,
  getUnregistedClassTypes,
);

/**
 * @swagger
 * /api/students/listTeachersOfClasTypeGrade/{classTypeId}:
 *   get:
 *     summary: Get list of teachers by class type and grade
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: classTypeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The class type ID
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Teachers not found
 *     security:
 *       - bearerAuth: []
 */
studentRouter.get(
  '/listTeachersOfClasTypeGrade/:classTypeId',
  authMiddleware,
  getTeacherListByClassTypeAndGrade,
);

export default studentRouter;
