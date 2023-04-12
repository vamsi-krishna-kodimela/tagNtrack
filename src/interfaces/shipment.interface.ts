import IShipmentStatus from "./shipment-status.interface";
import IUser from "./user.inerface";

export default interface IShipment {
  _id?: string;
  bookedOn: Date;
  bookedBy: IUser;
  pickupDetails: IUser;
  deliveryDeails: IUser;
  deliveryPartner: IUser;
  wieght: number;
  cost: number;
  latestStatus: IShipmentStatus;
}
