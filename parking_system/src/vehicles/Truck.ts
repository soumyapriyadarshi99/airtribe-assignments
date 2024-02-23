import { Vehicle } from "./Vehicle";
import { VehicleType } from "./Vehicle.type";

export class Truck extends Vehicle {
  constructor(vehicleRegisterNumber: string) {
    super(vehicleRegisterNumber, VehicleType.Truck);
  }
}
