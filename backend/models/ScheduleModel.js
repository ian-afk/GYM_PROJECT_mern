import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    // schedId
    // trainerId
    // clientId
    startDate: {
      type: Date,
      required: [true, 'startDate is required'],
    },
    timeStart: {
      type: Date,
      required: [true, 'timeStart is required'],
    },
    timeEnd: {
      type: Date,
      required: [true, 'timeEnd is required'],
    },
    clients: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
    },
    trainer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Trainer',
    },
    createdBy: String,
    updatedBy: String,
    isDeleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true },
  {
    // To show the output of data that is not existing in Database
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
