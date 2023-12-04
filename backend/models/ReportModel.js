import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  // reportId
  //paymentId
  //   clientId
  amount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const report = mongoose.model('report', reportSchema);

export default report;
