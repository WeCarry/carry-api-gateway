import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import registerRoutes from './routes';
import { Server } from 'http';
import { Server as SocketIoServer } from 'socket.io';
import { locationSocket } from './services/gps-tracking/location-socket';
import { registerDB } from './config/registerDb';

(async function () {
	const app = express();

	const port = process.env.PORT || 3000;

	app.use(cors());
	app.use(express.json());
	await registerDB();
	registerRoutes(app);

	// Create an HTTP server and attach the Express app to it
	const httpServer = new Server(app);

	// Create a new Socket.IO server instance and attach it to the HTTP server
	const io = new SocketIoServer(httpServer, {
		cors: {
			origin: '*',
		},
	});

	// Pass the Socket.IO server instance to the locationSocket function
	locationSocket(io);

	// Listen on the HTTP server instead of the Express app
	httpServer.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
})();
