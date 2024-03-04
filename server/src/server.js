import express from 'express'
import config from './config/env.config.js'
import loggerMiddleware from './middlewares/loggerMiddleware.js'
import defaultRouter from './routes/api/defaultRoute.js'
import connectToDatabase from './config/mongoose.config.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

connectToDatabase()
app.use('/api', defaultRouter)
app.use(loggerMiddleware)

const PORT = config.port || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
