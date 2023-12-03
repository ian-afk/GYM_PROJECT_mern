import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
  {
    experties: {
      type: String,
      required: [true, 'Trainer experties is required '],
    },
    isDeleted: {
      type: Boolean,
      defualt: 0,
    },
  },
  { timestamps: true }
);

// trainerSchema.pre('save')

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
