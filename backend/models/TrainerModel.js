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
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// trainerSchema.pre('save')

trainerSchema.virtual('schedules', {
  ref: 'Schedule',
  foreignField: 'trainer',
  localField: '_id',
});

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
