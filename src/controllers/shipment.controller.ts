import { Response } from "express";
import PopulatedRequest from "../interfaces/populated-payload.interface";
import IShipment from "../interfaces/shipment.interface";
import Shipment from "../schema/shipment.schema";
import ShipmentStatus from "../schema/shipment-status.schema";
import DeliveryDetails from "../schema/delivery-details.schema";
import UserType from "../interfaces/user-type.enum";

const createShipment = async (
  req: PopulatedRequest<IShipment>,
  res: Response
) => {
  const shipmentPayload = req.body;
  const user = req.user;
  try {
    if (user?.type == UserType[UserType.Customer]) {
      const shipmentStatus = await ShipmentStatus.create({
        status: "Booked",
      });
      const pickupDetails = await DeliveryDetails.create(
        shipmentPayload.pickupDetails
      );
      const deliveryDetails = await DeliveryDetails.create(
        shipmentPayload.deliveryDetails
      );
      const shipment = await Shipment.create({
        ...shipmentPayload,
        latestStatus: shipmentStatus,
        bookedBy: user,
        pickupDetails: pickupDetails,
        deliveryDetails: deliveryDetails,
      });
      res.json(shipment);
      return;
    }
  } catch (error) {
    res.status(400).send("Failed to book a shipment");
    return;
  }

  res.status(400).send("User not authorized to perform this action.");
};

export { createShipment };
