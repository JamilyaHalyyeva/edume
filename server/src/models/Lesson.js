import mongoose from 'mongoose';
import LessonSection from './LessonSection.js';

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
  classType: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassType' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessonSections: [LessonSection.schema],
});

const Lesson = mongoose.model('Lesson', lessonSchema, 'lesson');

export default Lesson;
