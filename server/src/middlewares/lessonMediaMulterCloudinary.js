import cloudinary from 'cloudinary';
import multer from 'multer';
import config from '../config/env.config.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

console.log('config :>> ', config);
cloudinary.v2.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    // Access user information from request, e.g., req.user.id or any other identifier
    const userId = req.userId; // Ensure that user is attached to request, e.g., via middleware
    const lessonId = req.params.lessonId;
    const sectionId = req.params.sectionId;
    console.log('🚀 ~ format: ~ file:', file);
    const fileFormat = file.mimetype.split('/')[1];
    console.log('🚀 ~ fileFormat:', fileFormat);
    const isVideo = file.mimetype.startsWith('video');
    return {
      folder: `jamilyaedume/${userId}/${lessonId}/${sectionId}`, // Dynamic folder name based on user ID
      resource_type: isVideo ? 'video' : 'image', // Dynamically set the resource type based on the file type
      allowedFormats: ['jpeg', 'png', 'jpg', 'mp4'], // Include 'mp4' if you're also uploading videos
      public_id: `${new Date().getTime()}`, // Using a timestamp prefix for uniqueness
      format: fileFormat,
    };
  },
});
// Configure multer with our cloudinary storage
const lessonMediaUpload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Allow files up to 20 MB
});

export default lessonMediaUpload;
