import { Schema, model } from "mongoose";

const user = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  address: {
    type: {
      address: String,
      city: String,
      state: String,
      country: String,
      pincode: Number,
      coordinates: { type: [{ type: Number }] },
    },
  },
  password: { type: String },
  type: {
    type: String,
    enum: ["Customer", "Delivery Agent"],
  },
});

export default model("User", user);
