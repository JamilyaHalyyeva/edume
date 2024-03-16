import mongoose from 'mongoose';

const Test = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const TestModel = mongoose.model('Test', Test, 'test');
export default TestModel;
