import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
  {
    experties: {
      type: String,
      required: [true, 'Trainer experties is required '],
    },
    employee: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employee',
      required: [true, 'Trainer Must be an existing employee'],
    },
    isDeleted: {
      type: Boolean,
      defualt: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// trainerSchema.pre('save')

trainerSchema.virtual('schedules', {
  ref: 'Schedule',
  foreignField: 'trainer',
  localField: '_id',
});

trainerSchema.virtual('employees', {
  ref: 'Employee',
  foreignField: '_id',
  localField: 'employee',
});

// trainerSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'employee',
//     select: 'firstName lastName',
//   });
//   next();
// });
const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
