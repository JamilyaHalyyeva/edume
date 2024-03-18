import mongoose from 'mongoose';
const gradeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Grade = mongoose.model('Grade', gradeSchema, 'grade');
export default Grade;
