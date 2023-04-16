import IAddress from "./address.interface";

export default interface IUser {
  _id?: string;
  name: String;
  email: string;
  mobile: string;
  address: IAddress;
  type: string;
}
