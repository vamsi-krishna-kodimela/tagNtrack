import IUser from "./user.inerface";

export default interface IAuth extends IUser {
  password?: string;
}
