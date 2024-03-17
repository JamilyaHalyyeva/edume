import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['teacher', 'student', 'admin'],
    default: 'student',
    required: true,
    trim: true,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade',
    required: false,
  },
  avatar: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('User', userSchema, 'users');
export default User;
