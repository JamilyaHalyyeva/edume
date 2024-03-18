import mongoose from 'mongoose';

const gradeClassTypeSchema = new mongoose.Schema({
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true },
  classType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassType',
    required: true,
  },
});
const GradeClassType = mongoose.model(
  'GradeClassType',
  gradeClassTypeSchema,
  'gradeClassType',
);
export default GradeClassType;
