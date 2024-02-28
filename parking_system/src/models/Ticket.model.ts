import { VehicleType } from "../vehicles/Vehicle.type";
import mongoose, { Schema, Document } from "mongoose";

export interface TicketDocument extends Document {
  vehicleType: VehicleType;
  entryTime: Date;
  exitTime: Date;
  vehicleRegisterNumber: string;
  floor: number;
}

const TicketSchema: Schema<TicketDocument> = new Schema({
  vehicleType: {
    type: String,
    enum: Object.values(VehicleType),
    required: true,
  },
  entryTime: {
    type: Date,
    default: new Date(),
  },
  exitTime: {
    type: Date,
    default: null,
  },
  vehicleRegisterNumber: {
    type: String,
    requiredPaths: true,
  },
  floor: {
    type: Number,
    required: true,
  },
});

const TicketModel = mongoose.model<TicketDocument>("Ticket", TicketSchema);

export default TicketModel;
