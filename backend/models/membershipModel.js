import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema(
  {
    // TODO
    // memberId,
    // clientId,
    subscription: {
      type: String,
      required: [true, 'Membership must have a subscription'],
      enum: {
        values: ['pro', 'delux', 'junior'],
        message: 'Subscription must only be pro, delux, or junior',
      },
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
    },
    createdBy: String,
    updatedBy: String,

    isDeleted: {
      type: Boolean,
      default: 0,
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

membershipSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'client',
    select: 'firstName lastName email',
  });

  next();
});

const Membership = mongoose.model('membership', membershipSchema);

export default Membership;
