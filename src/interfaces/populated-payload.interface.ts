import { Request } from "express";
import IUser from "./user.inerface";

export default interface PopulatedRequest<T> extends Request {
  user?: IUser;
  body: T;
}
