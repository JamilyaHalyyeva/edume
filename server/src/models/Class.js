import mongoose from 'mongoose';
const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Class = mongoose.model('Class', classSchema, 'class');
export default Class;
