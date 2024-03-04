import express from 'express'

const defaultRouter = express.Router()

defaultRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running successfully!' })
})
export default defaultRouter
