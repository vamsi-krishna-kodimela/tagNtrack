import IAddress from "./address.interface";
import UserType from "./user-type.enum";

export default interface IUser {
  _id?: string;
  name: String;
  email: string;
  mobile: string;
  address: IAddress;
  type: UserType;
}
