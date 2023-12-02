import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
  {
    emp_id: {},
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

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
