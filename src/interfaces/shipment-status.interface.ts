import IShipment from "./shipment.interface";
import ShipmentStatus from "./status.enum";

export default interface IShipmentStatus {
  date: Date;
  comment: string;
  status: ShipmentStatus;
  shipment: IShipment;
}
