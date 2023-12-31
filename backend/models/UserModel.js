import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Invalid user Email. ex: sample@email.com'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password Confirm is required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Confirm Password does not match',
    },
  },
  passwordChangedAt: Date,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.changedPasswordAt = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const timestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < timestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);

export default User;
