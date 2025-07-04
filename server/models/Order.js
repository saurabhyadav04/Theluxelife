import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, ref: 'user' }, // ✅ removed required for guest support
  items: [
    {
      product: { type: String, required: true, ref: 'product' },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: Object, required: true }, // ✅ changed from String + ref to raw object
  status: { type: String, default: 'Order Placed' },
  paymentType: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  isGuest: { type: Boolean, default: false }, // Optional: helps identify guest orders
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;
