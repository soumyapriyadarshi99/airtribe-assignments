import express, { Express, Request, Response } from "express";
const app: Express = express();
import bodyParser, { json } from "body-parser";
import cors from "cors";
import Database from "./config/Db.config";
import { ParkingSpot } from "./parking-spot/ParkingSpot";
import ParkingModel, { ParkingDocument } from "./models/Parking.model";
import TicketModel, { TicketDocument } from "./models/Ticket.model";
import Utility from "./utility/Utility";

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Database.getInstance();
// const connection = dbService.getConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Port 8000 is working fine");
});

app.post("/create-parking-spot", async (req: Request, res: Response) => {
  const { vehicleType, floor } = req.body;
  try {
    const newParkingSpot = new ParkingModel({
      vehicleType,
      floor,
    });
    const savedParkingSpot = await newParkingSpot.save();
    res.status(201).json(savedParkingSpot);
  } catch (err) {
    res.status(500).json({
      isError: true,
      error: err,
    });
  }
});

app.post("/create-ticket", async (req: Request, res: Response) => {
  const { vehicleType, vehicleRegisterNumber } = req.body;
  const entryTime = new Date();
  const capitalizedVehicleNumber = vehicleRegisterNumber?.toUpperCase();
  try {
    const availableParkingSpot = await ParkingModel.findOne({
      vehicleType: vehicleType,
      isAvailable: true,
    });

    if (!availableParkingSpot) {
      throw new Error("No available parking spot");
    }

    const newTicket = new TicketModel({
      vehicleType,
      vehicleRegisterNumber: capitalizedVehicleNumber,
      entryTime,
      floor: availableParkingSpot.floor,
    });
    const createdTicket = await newTicket.save();
    const updatedParkingSpot = await ParkingModel.findOneAndUpdate(
      {
        _id: availableParkingSpot._id,
      },
      {
        isAvailable: false,
        ticketNo: createdTicket?._id,
        vehicleRegisterNumber: capitalizedVehicleNumber,
      }
    );

    res.status(201).json(createdTicket); //
  } catch (err) {
    res.status(500).json({
      isError: true,
      error: err,
    });
  }
});

app.put("/create-ticket", async (req: Request, res: Response) => {
  try {
    const { vehicleRegisterNumber } = req?.body;
    if (vehicleRegisterNumber) {
      let totalParkingCharge: number | undefined = 0;
      let ticketToUpdate: TicketDocument | null = await TicketModel.findOne({
        vehicleRegisterNumber: vehicleRegisterNumber,
      });
      let parkingSpotToUpdate: ParkingDocument | null =
        await ParkingModel.findOne({
          vehicleRegisterNumber: vehicleRegisterNumber,
        });

      if (ticketToUpdate && !ticketToUpdate.exitTime) {
        ticketToUpdate.exitTime = new Date();
        const entryTimeMs = ticketToUpdate.entryTime.getTime(); // Convert to milliseconds
        const exitTimeMs = ticketToUpdate.exitTime.getTime(); // Convert to milliseconds
        const hourDifference =
          Math.abs(exitTimeMs - entryTimeMs) / (1000 * 60 * 60); // Convert milliseconds to hours
        const hours: number = Math.round(hourDifference); //
        totalParkingCharge = Utility.calculatePrice(
          ticketToUpdate?.vehicleType,
          hours
        );
      } else {
        throw new Error("Ticket not found");
      }

      if (parkingSpotToUpdate) {
        parkingSpotToUpdate.isAvailable = true;
        parkingSpotToUpdate.ticketNo = null;
        parkingSpotToUpdate.vehicleRegisterNumber = null;
      } else {
        throw new Error("Parking spot not found");
      }
      let savedTicket = await TicketModel.findOneAndUpdate(
        {
          vehicleRegisterNumber: vehicleRegisterNumber,
        },
        ticketToUpdate
      );
      let savedParkingSpot = await ParkingModel.findOneAndUpdate(
        { vehicleRegisterNumber: vehicleRegisterNumber },
        parkingSpotToUpdate
      );
      console.log(savedParkingSpot);
      res.status(200).send({ ...savedTicket, price: totalParkingCharge });
    } else {
      throw new Error("Vehicle not found");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/get-parking-spots", async (req: Request, res: Response) => {
  try {
    const { floor, ticketNo } = req?.body;
    let filter = {};
    if (floor) {
      filter = { ...filter, floor: floor };
    }
    if (ticketNo) {
      filter = { ...filter, ticketNo: ticketNo };
    }
    const parkingSpots = await ParkingModel.find({ ...filter });
    res.status(200).json(parkingSpots);
  } catch (err) {
    res.status(500).json({
      isError: true,
      message: "Internal server error",
      error: err,
    });
  }
});

app.get("/get-tickets", async (req: Request, res: Response) => {
  try {
    const tickets = await TicketModel.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({
      isError: true,
      message: "Internal server error",
      error: err,
    });
  }
});

app.listen(PORT, async () => {
  console.log(`running on ${PORT}`);
});
