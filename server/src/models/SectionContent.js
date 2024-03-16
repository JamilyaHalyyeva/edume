import mongoose from 'mongoose';
import TestModel from './Test.js';

const sectionContentSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  documentUrl: {
    type: String,
    required: false,
  },

  lessonSection: { type: mongoose.Schema.Types.ObjectId, ref: 'LessonSection' },
  test: [TestModel.schema],
});

const SectionContent = mongoose.model(
  'SectionContent',
  sectionContentSchema,
  'sectionContent',
);
export default SectionContent;
