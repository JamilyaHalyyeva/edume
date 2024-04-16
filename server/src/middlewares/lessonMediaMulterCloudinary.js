import cloundinary from 'cloudinary';
import multer from 'multer';
import config from '../config/env.config';

cloudinary.v2.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    // Access user information from request, e.g., req.user.id or any other identifier
    const userId = req.user.id; // Ensure that user is attached to request, e.g., via middleware
    const lessonId = req.params.lessonId;
    return {
      folder: `jamilyaedume/${userId}/${lessonId}`, // Dynamic folder name based on user ID
      allowedFormats: ['jpeg', 'png', 'jpg', 'mp4'], // Include 'mp4' if you're also uploading videos
      public_id: (file) => `${new Date().getTime()}-${file.originalname}`, // Using a timestamp prefix for uniqueness
    };
  },
});
// Configure multer with our cloudinary storage
const lessonMediaUpload = multer({ storage });

export default lessonMediaUpload;
