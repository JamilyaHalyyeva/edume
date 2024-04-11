/**
 * @swagger
 * tags:
 *   name: LessonSection
 *   description: API endpoints for lessonSection
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
  handleDeleteLessonSection,
  handleGetLessonSectionById,
  handlePatchLessonSection,
  handlePostLessonSection,
  hanleGetLessonSections,
} from '../../controllers/lessonSectionController.js';

const lessonSectionRouter = express.Router();

// Get all lesson sections
/**
 * @swagger
 * /api/lessonSection:
 *   get:
 *     summary: Get all lesson sections
 *     tags: [LessonSection]
 *     description: Retrieve a list of all lesson sections
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of lesson sections
 */
lessonSectionRouter.get('/', authMiddleware, hanleGetLessonSections);

// Get a lesson section by ID
/**
 * @swagger
 * /api/lessonSection/{lessonSectionId}:
 *   get:
 *     summary: Get a lesson section by ID
 *     tags: [LessonSection]
 *     description: Retrieve a lesson section by its ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonSectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lesson section to retrieve
 *     responses:
 *       '200':
 *         description: The requested lesson section
 */
lessonSectionRouter.get(
  '/:lessonSectionId',
  authMiddleware,
  handleGetLessonSectionById,
);

// Create a new lesson section
/**
 * @swagger
 * /api/lessonSection:
 *   post:
 *     summary: Create a new lesson section
 *     tags: [LessonSection]
 *     description: Create a new lesson section
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *              order:
 *               type: number
 *              lesson:
 *               type: string
 *               description: Lesson ID
 *     responses:
 *       '200':
 *         description: The created lesson section
 */
lessonSectionRouter.post('/', authMiddleware, handlePostLessonSection);

// Update a lesson section
/**
 * @swagger
 * /api/lessonSection/{lessonSectionId}:
 *   patch:
 *     summary: Update a lesson section
 *     tags: [LessonSection]
 *     description: Update a lesson section
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonSectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lesson section to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *              order:
 *               type: number
 *              lesson:
 *               type: string
 *               description: Lesson ID
 *     responses:
 *       '200':
 *         description: The updated lesson section
 */
lessonSectionRouter.patch(
  '/:lessonSectionId',
  authMiddleware,
  handlePatchLessonSection,
);

// Delete a lesson section
/**
 * @swagger
 * /api/lessonSection/{lessonSectionId}:
 *   delete:
 *     summary: Delete a lesson section
 *     tags: [LessonSection]
 *     description: Delete a lesson section
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonSectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the lesson section to delete
 *     responses:
 *       '200':
 *         description: The deleted lesson section
 */
lessonSectionRouter.delete(
  '/:lessonSectionId',
  authMiddleware,
  handleDeleteLessonSection,
);

export default lessonSectionRouter;
