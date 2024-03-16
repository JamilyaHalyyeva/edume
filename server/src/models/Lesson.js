import mongoose from 'mongoose';
import LessonSection from './LessonSection';

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  lessonSections: [LessonSection.schema],
});

const Lesson = mongoose.model('Lesson', lessonSchema, 'lesson');

export default Lesson;
