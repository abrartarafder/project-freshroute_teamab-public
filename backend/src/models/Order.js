import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    quantity: Number,
    unitPrice: Number,
    unitLabel: String,
    priceLabel: String,
    group: String,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    address: {
      fullName: String,
      street: String,
      city: String,
      postal: String,
      phone: String,
      notes: String,
    },
    deliverySlot: String,
    deliveryDate: String,
    deliveryStatus: String,
    saveCard: Boolean,
    totals: {
      subtotal: Number,
      tax: Number,
      shipping: Number,
      total: Number,
    },
    items: [ItemSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Orders" }
);

export default mongoose.model("Order", OrderSchema);
