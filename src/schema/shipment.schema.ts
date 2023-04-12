import { Schema } from "mongoose";

const shipment = new Schema({
  bookedOn: { type: Date },
  bookedBy: { type: Schema.Types.ObjectId, ref: "User" },
  deliveryPartner: { type: Schema.Types.ObjectId, ref: "User" },
  PickupDetails: { type: Schema.Types.ObjectId, ref: "DeliveryDetail" },
  deliveryDetails: { type: Schema.Types.ObjectId, ref: "DeliveryDetail" },
  weight: { type: Number },
  latestStatus: {
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
