import mongoose, { Connection } from "mongoose";

class Database {
  private static instance: Database;
  private connection: Connection;

  private constructor() {
    const uri = `mongodb://0.0.0.0:27017/parking_system`;

    mongoose
      .connect(uri)
      .then(() => {
        console.log("Db connected successfully");
        // Now that the connection is established, setup event listener
        // this.setupConnectionListener();
      })
      .catch((err: any) => console.error(`Database connection error: ${err}`));

    this.connection = mongoose.connection;
  }

  // private setupConnectionListener(): void {
  //   this.connection.once("open", () => {
  //     console.log("MongoDB connection opened");
  //   });

  //   this.connection.on("error", (err: any) => {
  //     console.error("MongoDB connection error:", err);
  //   });

  //   this.connection.on("disconnected", () => {
  //     console.log("MongoDB disconnected");
  //   });
  // }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getConnection(): mongoose.Connection {
    return this.connection;
  }
}

export default Database;
