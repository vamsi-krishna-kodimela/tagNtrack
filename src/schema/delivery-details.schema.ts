import { Schema, model } from "mongoose";

const deliveryDetails = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  address: {
    type: {
      address: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
      coordinates: { type: [{ type: Number }] },
    },
  },
});

export = model("DeliveryDetail", deliveryDetails);
