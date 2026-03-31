import mongoose from "mongoose";

const normalizeDeliveryStatus = (value) => {
  const raw = String(value || "").trim().toLowerCase();

  if (raw === "pending" || raw === "placed") return "Placed";
  if (raw === "starting" || raw === "preparing") return "Preparing";
  if (raw === "out for delivery") return "Out for Delivery";
  if (raw === "delivered") return "Delivered";
  if (raw === "cancelled" || raw === "canceled") return "Cancelled";

  return "Placed";
};

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
    deliveryStatus: {
      type: String,
      enum: ["Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Placed",
      set: normalizeDeliveryStatus,
    },
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
