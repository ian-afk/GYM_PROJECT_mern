import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
  {
    productName: String,
    productPhoto: String,
    price: Number,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

shopSchema.virtual('goodbuy').get(function () {
  return this.price < 100 ? 'sale' : null;
});

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
