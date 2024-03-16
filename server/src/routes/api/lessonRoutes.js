/**
 * @swagger
 * tags:
 *   name: Lesson
 *   description: API endpoints for lesson
 * components:
 *  schemas:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *
 */
import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import {
  handleDeleteLesson,
  handleGetLessonById,
  handleGetLessons,
  handlePatchLesson,
  handlePostLesson,
} from '../../controllers/lessonController.js';

const lessonRouter = express.Router();
// Get all lessons
/**
 * @swagger
 * /api/lesson:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lesson]
 *     description: Retrieve a list of all lessons
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of lessons
 */
lessonRouter.get('/', authMiddleware, handleGetLessons);

// Get a lesson by ID
/**
 * @swagger
 * /api/lesson/{lessonId}:
 *   get:
 *     summary: Get a lesson by ID
 *     tags: [Lesson]
 *     description: Retrieve a lesson by its ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lesson to retrieve
 *     responses:
 *       '200':
 *         description: The requested lesson
 *       '404':
 *         description: Lesson not found
 */

lessonRouter.get('/:lessonId', authMiddleware, handleGetLessonById);

// Create a new lesson
/**
 * @swagger
 * /api/lesson:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lesson]
 *     description: Create a new lesson
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               grade:
 *                 type: string
 *                 description: Grade ID
 *               classType:
 *                 type: string
 *                 description: Class type ID
 *     responses:
 *       '200':
 *         description: The created lesson
 */
lessonRouter.post('/', authMiddleware, handlePostLesson);

// Update a lesson
/**
 * @swagger
 * /api/lesson/{lessonId}:
 *   patch:
 *     summary: Update a lesson
 *     tags: [Lesson]
 *     description: Update an existing lesson by its ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lesson to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               grade:
 *                 type: string
 *                 description: Grade ID
 *               classType:
 *                 type: string
 *                 description: Class type ID
 *     responses:
 *       '200':
 *         description: The updated lesson
 *       '404':
 *         description: Lesson not found
 */
lessonRouter.patch('/:lessonId', authMiddleware, handlePatchLesson);

// Delete a lesson
/**
 * @swagger
 * /api/lesson/{lessonId}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lesson]
 *     description: Delete a lesson by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lesson to delete
 *     responses:
 *       '200':
 *         description: The deleted lesson
 *       '404':
 *         description: Lesson not found
 */
lessonRouter.delete('/:lessonId', authMiddleware, handleDeleteLesson);

export default lessonRouter;
