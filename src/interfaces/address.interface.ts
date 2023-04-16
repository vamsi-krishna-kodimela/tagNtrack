export default interface IAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  coordinates?: number[];
}
