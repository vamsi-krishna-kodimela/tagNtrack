import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const URI: string = process.env.MONGO_DB_URI ?? "";

const mongooseConnect = (cb: Function) => {
  connect(URI).then(() => {
    console.log("Connected to MONGO DB");
    cb();
  });
};

export { mongooseConnect };
