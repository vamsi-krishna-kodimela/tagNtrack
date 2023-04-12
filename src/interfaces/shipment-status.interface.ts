import IShipment from "./shipment.interface";

export default interface IShipmentStatus {
  date: Date;
  comment: string;
  status: ShipmentStatus;
  shipment: IShipment;
}
