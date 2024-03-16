/**
 * @swagger
 * tags:
 *   name: SectionContent
 *   description: API endpoints for section content
 * components:
 *  schemas:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *
 */
import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';

const sectionContentRouter = express.Router();

// Get all section contents
/**
 * @swagger
 * /api/sectionContent:
 *   get:
 *     summary: Get all section contents
 *     tags: [SectionContent]
 *     description: Retrieve a list of all section contents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of section contents
 */
sectionContentRouter.get('/', authMiddleware, handleGetSectionContents);

// Get a section content by ID
/**
 * @swagger
 * /api/sectionContent/{sectionContentId}:
 *   get:
 *     summary: Get a section content by ID
 *     tags: [SectionContent]
 *     description: Retrieve a section content by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionContentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the section content to retrieve
 *     responses:
 *       '200':
 *         description: The requested section content
 */
sectionContentRouter.get(
  '/:sectionContentId',
  authMiddleware,
  handleGetSectionContentById,
);

// Create a new section content
/**
 * @swagger
 * /api/sectionContent:
 *   post:
 *     summary: Create a new section content
 *     tags: [SectionContent]
 *     description: Create a new section content
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoUrl:
 *                 type: string
 *               order:
 *                 type: number
 *               documentUrl:
 *                 type: string
 *               lessonSection:
 *                 type: string
 *                 description: Lesson section ID
 *     responses:
 *       '200':
 *         description: The created section content
 */
sectionContentRouter.post('/', authMiddleware, handlePostSectionContent);

// Update a section content
/**
 * @swagger
 * /api/sectionContent/{sectionContentId}:
 *   patch:
 *     summary: Update a section content
 *     tags: [SectionContent]
 *     description: Update an existing section content by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionContentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the section content to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoUrl:
 *                 type: string
 *               order:
 *                 type: number
 *               documentUrl:
 *                 type: string
 *               lessonSection:
 *                 type: string
 *                 description: Lesson section ID
 *     responses:
 *       '200':
 *         description: The updated section content
 */
sectionContentRouter.patch(
  '/:sectionContentId',
  authMiddleware,
  handlePatchSectionContent,
);

// Delete a section content
/**
 * @swagger
 * /api/sectionContent/{sectionContentId}:
 *   delete:
 *     summary: Delete a section content
 *     tags: [SectionContent]
 *     description: Delete a section content by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionContentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the section content to delete
 *     responses:
 *       '200':
 *         description: The deleted section content
 */
sectionContentRouter.delete(
  '/:sectionContentId',
  authMiddleware,
  handleDeleteSectionContent,
);

export default lessonSectionRouter;
