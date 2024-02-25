import { VehicleType } from "../vehicles/Vehicle.type";

export abstract class ParkingSpot {
  private parkingId: string;
  private vehicleType: VehicleType;
  private isAvailable: boolean;
  private floor: number;
  private ticketNo: number;
  private vehicleRegisterNumber: string;

  constructor(
    parkingId: string,
    vehicleType: VehicleType,
    floor: number,
    ticketNo: number,
    vehicleRegisterNumber: string
  ) {
    this.parkingId = parkingId;
    this.isAvailable = true;
    this.vehicleType = vehicleType;
    this.floor = floor;
    this.ticketNo = ticketNo;
    this.vehicleRegisterNumber = vehicleRegisterNumber;
  }
  public getParkingId(): string {
    return this.parkingId;
  }
  public getVehicleType(): string {
    return this.vehicleType;
  }
  public isSpotAvailbale(): boolean {
    return this.isAvailable;
  }
  public getFloor(): number {
    return this.floor;
  }
  public getTicketNo(): number {
    return this.ticketNo;
  }
  public getVehicleRegisterNumber(): string {
    return this.vehicleRegisterNumber;
  }
}
