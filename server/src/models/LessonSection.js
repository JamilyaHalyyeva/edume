import mongoose from 'mongoose';
import SectionContent from './SectionContent.js';

const lessonSectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  sectionContents: [SectionContent.schema],
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
});

const LessonSection = mongoose.model(
  'LessonSection',
  lessonSectionSchema,
  'lessonSection',
);
export default LessonSection;
