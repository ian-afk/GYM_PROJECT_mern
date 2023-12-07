import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password Confirm is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'manager', 'hr'],
    default: 'user',
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
});
