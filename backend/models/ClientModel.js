import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    // clientId
    firstName: {
      type: String,
      required: [true, 'Client firstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Client lastName is required'],
    },
    age: {
      type: Number,
      required: [true, 'Client age is required'],
    },
    gender: {
      type: String,
      required: [true, 'Client gender is required'],
      enum: {
        values: ['male', 'female'],
        message: 'Client gender must be male or female',
      },
    },
    address: {
      type: String,
      required: [true, 'Client address is required'],
    },
    email: {
      type: String,
      required: [true, 'Client email is required'],
      unique: true,
    },
    contactNo: {
      type: Number,
      required: [true, 'Client contactNo is required'],
    },
    createdBy: String,
    updatedBy: String,
    isDeleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model('client', clientSchema);

export default Client;
