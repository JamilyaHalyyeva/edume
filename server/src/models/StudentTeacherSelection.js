import mongoose from 'mongoose';

const StudentTeacherSelectionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
  classType: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassType' },
});
const StudentTeacherSelection = mongoose.model(
  'StudentTeacherSelection',
  StudentTeacherSelectionSchema,
  'studentTeacherSelections',
);
export default StudentTeacherSelection;
