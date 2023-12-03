import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    // clientId
    // date
    amount: Number,
    items: String,
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model('payment', paymentSchema);

export default Payments;
