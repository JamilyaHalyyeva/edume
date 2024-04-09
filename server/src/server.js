import express from 'express';
import config from './config/env.config.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import defaultRouter from './routes/api/defaultRoute.js';
import authRouter from './routes/api/authRoutes.js';
import connectToDatabase from './config/mongoose.config.js';
import cors from 'cors';
import { swaggerUI, specs } from './middlewares/swaggerMiddleware.js';
import classTypeRouter from './routes/api/classTypeRoutes.js';
import gradeRouter from './routes/api/gradeRoutes.js';
import lessonRouter from './routes/api/lessonRoutes.js';
import gradeClassTypeRouter from './routes/api/gradeClassTypeRoutes.js';
import lessonSectionRouter from './routes/api/lessonSectionRoutes.js';
import studentRouter from './routes/api/studentRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

connectToDatabase();
app.use(loggerMiddleware);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/api', defaultRouter);
app.use('/api/auth', authRouter);
app.use('/api/classType', classTypeRouter);
app.use('/api/grade', gradeRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/gradeClassType', gradeClassTypeRouter);
app.use('/api/lessonSection', lessonSectionRouter);
app.use('/api/students', studentRouter);
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
