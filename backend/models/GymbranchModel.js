import mongoose from 'mongoose';

const gymbranchSchema = new mongoose.Schema(
  {
    // mangerId
    name: {
      type: String,
      default: 'El Amagros EL',
    },
    gymLevel: {
      type: String,
      enum: {
        values: ['junior', 'pro', 'delux'],
        message: 'gymLevel is either: junior,pro,delux',
      },
    },
    address: {
      type: String,
      required: [true, 'gym address is required'],
    },
    email: {
      type: String,
      required: [true, 'gym email is required'],
      unique: true,
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: 0,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const GymBranch = mongoose.model('gymbranches', gymbranchSchema);

export default GymBranch;
