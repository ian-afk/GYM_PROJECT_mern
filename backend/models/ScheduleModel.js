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
    createdBy: String,
    updatedBy: String,
    isDeleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
