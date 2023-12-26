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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// paymentSchema.virtual('fullName').get(async function () {
//   return `${this.client.firstName} ${this.client.lastName}`;
// });

paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'client',
    select: '_id firstName email lastName',
  });
  next();
});

const Payments = mongoose.model('payment', paymentSchema);

export default Payments;
