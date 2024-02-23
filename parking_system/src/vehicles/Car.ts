import { Vehicle } from "./Vehicle";
import { VehicleType } from "./Vehicle.type";

export class Car extends Vehicle {
  constructor(vehicleRegisterNumber: string) {
    super(vehicleRegisterNumber, VehicleType.Car);
  }
}
