import mongoose from 'mongoose';

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
  lessonSections: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'LessonSection' },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Lesson = mongoose.model('Lesson', lessonSchema, 'lesson');

export default Lesson;
