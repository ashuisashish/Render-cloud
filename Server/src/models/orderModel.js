import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, 
        },
        price: {
          type: Number,
          required: true,
          min: 0, 
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    total_price: {
      type: Number,
      required: true,
      min: 0, 
    },
  },
  {
    timestamps: true, 
  }
);

const Order=model("Order",orderSchema);
export default Order;
