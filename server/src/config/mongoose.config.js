import mongoose from 'mongoose'
import config from './env.config.js'

export default async function connectToDatabase() {
  try {
    await mongoose.connect(config.dbUri)
    console.log('successful connected to DB')
  } catch (error) {
    console.log('error connecting to db', error.message)
  }
}
