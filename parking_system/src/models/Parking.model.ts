import { VehicleType } from "../vehicles/Vehicle.type";
import mongoose, { Schema, Document } from "mongoose";

export interface ParkingDocument extends Document {
  vehicleType: VehicleType;
  isAvailable: boolean;
  floor: number;
  ticketNo: string | null;
  vehicleRegisterNumber: string | null;
}

const ParkingSchema: Schema<ParkingDocument> = new Schema({
  vehicleType: {
    type: String,
    enum: Object.values(VehicleType),
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: false,
    default: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  ticketNo: {
    type: String,
    required: false,
    default: null,
  },
  vehicleRegisterNumber: {
    type: String,
    required: false,
    default: null,
  },
});

const ParkingModel = mongoose.model<ParkingDocument>("Parking", ParkingSchema);

export default ParkingModel;
