import express from 'express'
import config from './config/env.config.js'
import loggerMiddleware from './middlewares/loggerMiddleware.js'
import defaultRouter from './routes/api/defaultRoute.js'
import authRouter from './routes/api/authRoutes.js'
import connectToDatabase from './config/mongoose.config.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

connectToDatabase()
app.use(loggerMiddleware)
app.use('/api', defaultRouter)
app.use('/api/auth', authRouter)

const PORT = config.port || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
