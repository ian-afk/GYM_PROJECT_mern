import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    items: String,
    amount: Number,
    client: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'Payment should have Client'],
    },
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model('payment', paymentSchema);

export default Payments;
