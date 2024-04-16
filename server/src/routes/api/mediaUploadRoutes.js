/**
 * @swagger
 * tags:
 *   name: mediaUpload
 *   description: API endpoints for media upload
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
import lessonMediaUpload from '../../middlewares/lessonMediaMulterCloudinary';
import { handleUpload } from '../../controllers/mediaUploadController';

const mediaUploadRouter = express.Router();

/**
 * @swagger
 * /api/mediaUpload:
 *   post:
 *     summary: Upload media file
 *     tags: [mediaUpload]
 *     description: Upload a media file
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Media file uploaded successfully
 */
mediaUploadRouter.post(
  '/:lessonId',
  authMiddleware,
  lessonMediaUpload.single('file'),
  handleUpload,
);

export default mediaUploadRouter;
