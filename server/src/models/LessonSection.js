import mongoose from 'mongoose';

const lessonSectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  sectionContents: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'SectionContent' },
  ],
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  parentSection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LessonSection',
    default: null,
  }, // Optional reference to another LessonSection
});

const LessonSection = mongoose.model(
  'LessonSection',
  lessonSectionSchema,
  'lessonSection',
);
export default LessonSection;
