import { Schema, model } from "mongoose";

const status = new Schema({
  date: { type: Date },
  comment: { type: String },
  status: {
    type: String,
    enum: [
      "In Progress",
      "Booked",
      "Pickup In Progress",
      "Picked",
      "Unable To Reach",
      "Cancelled",
      "Reached",
      "Out For Delivery",
      "Delivered",
    ],
  },
});

export = model("ShipmentStatus", status);
