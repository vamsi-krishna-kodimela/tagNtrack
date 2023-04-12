import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { mongooseConnect } from "./config/db.config";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongooseConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
