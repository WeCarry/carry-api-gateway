import { Server } from "socket.io";

export const locationSocket = (io: Server) => {
  const locationNamespace = io.of("/location");

  locationNamespace.on("connection", (socket) => {
    console.log("Client connected to location namespace");

    socket.on("join", (driverId: string) => {
      socket.join(driverId);
    });

    socket.on("locationUpdate", (driverId: string, location: { lat: number; lng: number }) => {
      locationNamespace.to(driverId).emit("driverLocation", location);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from location namespace");
    });
  });
};
