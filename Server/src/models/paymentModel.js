import mongoose from "mongoose";

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, 
    },
    status: {
      type: String,
      enum: ["Success", "Failed", "Pending"], 
      default: "Pending",
    },
    transaction_id: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Payment=model("Payment",paymentSchema);
export default Payment;
