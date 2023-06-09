import IShipmentStatus from "./shipment-status.interface";
import IUser from "./user.inerface";

export default interface IShipment {
  _id?: string;
  bookedOn: Date;
  bookedBy: IUser;
  pickupDetails: IUser;
  deliveryDetails: IUser;
  deliveryPartner?: IUser;
  weight: string;
  cost?: number;
  latestStatus: IShipmentStatus;
}
