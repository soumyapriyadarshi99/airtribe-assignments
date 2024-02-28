import { VehicleType } from "../vehicles/Vehicle.type";

export default class Utility {
  static calculatePrice(vehicleType: string, hour: number) {
    const carPerHour: number = 100;
    const motorCyclePerHour: number = 50;
    const truckPerHour: number = 50;

    if (vehicleType === VehicleType.Truck) {
      return truckPerHour * hour;
    } else if (vehicleType === VehicleType.Car) {
      return carPerHour * hour;
    } else if (vehicleType === VehicleType.Motorcycle) {
      return motorCyclePerHour * hour;
    }
  }
}
