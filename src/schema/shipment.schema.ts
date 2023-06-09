import { Schema, model } from "mongoose";

const shipment = new Schema({
  bookedOn: { type: Date, default: Date.now },
  bookedBy: { type: Schema.Types.ObjectId, ref: "User" },
  deliveryPartner: { type: Schema.Types.ObjectId, ref: "User" },
  pickupDetails: { type: Schema.Types.ObjectId, ref: "DeliveryDetail" },
  deliveryDetails: { type: Schema.Types.ObjectId, ref: "DeliveryDetail" },
  weight: { type: String },
  cost: { type: String },
  latestStatus: { type: Schema.Types.ObjectId, ref: "ShipmentStatus" },
});

export = model("Shipment", shipment);
