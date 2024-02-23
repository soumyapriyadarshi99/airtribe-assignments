import { VehicleType } from "./Vehicle.type";

export abstract class Vehicle {
  private registerNumber: string;
  private type: VehicleType;

  constructor(vehicleRegisterNumber: string, vehicleType: VehicleType) {
    this.registerNumber = vehicleRegisterNumber;
    this.type = vehicleType;
  }

  public getVehicleRegisterNumber() {
    return this.registerNumber;
  }
  public getVehicleType() {
    return this.type;
  }
}
