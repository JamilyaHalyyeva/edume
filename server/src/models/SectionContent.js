import mongoose from 'mongoose';

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
  order: {
    type: Number,
    required: true,
  },

  lessonSection: { type: mongoose.Schema.Types.ObjectId, ref: 'LessonSection' },
});

const SectionContent = mongoose.model(
  'SectionContent',
  sectionContentSchema,
  'sectionContent',
);
export default SectionContent;
