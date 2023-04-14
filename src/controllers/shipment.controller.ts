import { Request, Response } from "express";
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
    if (user?.type == "Customer") {
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

const getShipmentsById = async (req: Request, res: Response) => {
  const shipmentId = req.params.id;
  try {
    const shipment = await Shipment.findById(shipmentId)
      .populate({
        path: "bookedBy",
        strictPopulate: false,
        select: "-password",
      })
      .populate({
        path: "deliveryPartner",
        strictPopulate: false,
        select: "-password",
      })
      .populate({
        path: "PickupDetails",
        strictPopulate: false,
      })
      .populate({
        path: "deliveryDetails",
        strictPopulate: false,
      })
      .populate({
        path: "latestStatus",
        strictPopulate: false,
      });
    if (shipment) {
      res.json(shipment);
      return;
    }
    res.status(400).send("Shipment wih Id no found.");
    return;
  } catch (error) {
    res.status(400).send("Something went wrong.");
    return;
  }
};

const getShipments = async (req: PopulatedRequest<any>, res: Response) => {
  const user = req.user;
  if (user?.type == "Customer") {
    const shipments = await Shipment.find({ bookedBy: user })
      .populate({
        path: "bookedBy",
        strictPopulate: false,
        select: "-password",
      })
      .populate({
        path: "deliveryPartner",
        strictPopulate: false,
        select: "-password",
      })
      .populate({
        path: "PickupDetails",
        strictPopulate: false,
      })
      .populate({
        path: "deliveryDetails",
        strictPopulate: false,
      })
      .populate({
        path: "latestStatus",
        strictPopulate: false,
      });
    if (shipments) {
      res.json(shipments);
      return;
    } else {
      res.json([]);
      return;
    }
  } else {
    const shipments = await Shipment.find()
      .populate({
        path: "bookedBy",
        strictPopulate: false,
        select: "-password",
      })
      .populate({
        path: "deliveryPartner",
        strictPopulate: false,
        select: "-password",
      })
      .populate({
        path: "PickupDetails",
        strictPopulate: false,
      })
      .populate({
        path: "deliveryDetails",
        strictPopulate: false,
      })
      .populate({
        path: "latestStatus",
        strictPopulate: false,
      });
    res.json(shipments);
  }
};

const updateStatus = async (
  req: PopulatedRequest<{ status: string }>,
  res: Response
) => {
  const user = req.user;
  const shipmentId = req.params.id;
  const status = req.body.status;
  if (user?.type == "Delivery Agent") {
    try {
      const statusObj = await ShipmentStatus.create({ status: status });
      const shipment = await Shipment.findByIdAndUpdate(shipmentId, {
        latestStatus: statusObj,
      });
      res.json(shipment);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).send("Failed to update status.");
      return;
    }
  }
  res.status(400).send("User not authorized to access this feature.");
};

export { createShipment, getShipmentsById, getShipments, updateStatus };
