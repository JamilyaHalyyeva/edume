import dotenv from 'dotenv';
dotenv.config();
const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  client_app_url: process.env.CLIENT_APP_URL,
  smtp_server: process.env.SMTP_SERVER,
  smtp_port: process.env.SMTP_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  seedData: process.env.SEED_DATA,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  // Add other environment variables here
};
export default config;
