import dotenv from 'dotenv'
dotenv.config()
const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,
  
  // Add other environment variables here
}
export default config
