import mongoose from 'mongoose';
const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const ClassType = mongoose.model('ClassType', classSchema, 'classType');
export default ClassType;
