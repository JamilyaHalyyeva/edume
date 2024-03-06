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

  // Add other environment variables here
};
export default config;
