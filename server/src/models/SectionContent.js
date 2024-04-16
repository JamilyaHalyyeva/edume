import mongoose from 'mongoose';

const sectionContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'pdf', 'other'], // Ensures the type is one of the specified values
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
