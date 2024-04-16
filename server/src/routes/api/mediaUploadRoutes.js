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
import authMiddleware from '../../middlewares/authMiddleware.js';
import lessonMediaUpload from '../../middlewares/lessonMediaMulterCloudinary.js';
import { handleVideoUpload } from '../../controllers/mediaUploadController.js';
import multer from 'multer';

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
const myUpload = lessonMediaUpload.single('file');
mediaUploadRouter.post(
  '/:lessonId/:sectionId',
  authMiddleware,
  (req, res, next) => {
    myUpload(req, res, function (error) {
      if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error('MulterError:', error);
        return res
          .status(500)
          .json({ message: `Multer error: ${error.message}` });
      } else if (error) {
        // An unknown error occurred when uploading.
        console.error('Unknown Error:', error);
        return res.status(500).json({ message: `Error: ${error.message}` });
      }

      // Everything went fine.
      next();
    });
  },
  handleVideoUpload,
);

export default mediaUploadRouter;
