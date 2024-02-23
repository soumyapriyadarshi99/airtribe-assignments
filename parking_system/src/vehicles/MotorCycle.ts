import { Vehicle } from "./Vehicle";
import { VehicleType } from "./Vehicle.type";

export class MotorCycle extends Vehicle {
  constructor(vehicleRegisterNumber: string) {
    super(vehicleRegisterNumber, VehicleType.Motorcycle);
  }
}
