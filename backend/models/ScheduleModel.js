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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

scheduleSchema.virtual('dateStart').get(function () {
  function formatDate(date) {
    const m = date.getMonth() + 1 + '';
    const d = date.getDate() + '';
    const y = date.getFullYear();
    const month = m.length > 1 ? `${m}` : `0${m}`;
    const day = d.length > 1 ? `${d}` : `0${d}`;
    return `${y}-${month}-${day}`;
  }
  const dateStart = formatDate(this.startDate);
  return dateStart;
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
