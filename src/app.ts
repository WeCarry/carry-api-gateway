import express, { Application } from 'express';
import * as http from 'http';
import helmet from 'helmet';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import debug from 'debug';
import dotenv from 'dotenv';
dotenv.config();
console.log('ENV:', process.env.ENV);
import mongooseService from './common/services/mongoose.service';
import { registerRoutes } from './common/config/routes.config';
import setupSocket from './common/tools/socket/socket';

const startServer = async () => {
	try {
		// Wait for database connection
		await mongooseService.connectWithRetry();

		const app: Application = express();
		app.use(helmet());
		const server: http.Server = http.createServer(app);
		const port = 3000;
		const routes: Array<CommonRoutesConfig> = [];
		const debugLog: debug.IDebugger = debug('app');

		// here we are adding middleware to parse all incoming requests as JSON
		app.use(express.json());

		// create socket server.
		const io = setupSocket(server);

		// here we are adding middleware to allow cross-origin requests
		app.use(cors());

		// here we are preparing the expressWinston logging middleware configuration,
		// which will automatically log all HTTP requests handled by Express.js
		const loggerOptions: expressWinston.LoggerOptions = {
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.colorize({ all: true })
			),
		};

		if (!process.env.DEBUG) {
			loggerOptions.meta = false; // when not debugging, log requests as one-liners
		}

		// initialize the logger with the above configuration
		app.use(expressWinston.logger(loggerOptions));

		// here we are adding the UserRoutes to our array,
		// after sending the Express.js application object to have the routes added to our app!
		registerRoutes(routes, app);

		// this is a simple route to make sure everything is working properly
		const runningMessage = `Server running at http://localhost:${port}`;
		app.get('/', (req: express.Request, res: express.Response) => {
			res.status(200).send(runningMessage);
		});

		// Initialize Socket.io connection handling
		// io.on('connection', handleSocketConnection);
		server.listen(port, () => {
			routes.forEach((route: CommonRoutesConfig) => {
				debugLog(`Routes configured for ${route.getName()}`);
			});
			// our only exception to avoiding console.log(), because we
			// always want to know when the server is done starting up
			console.log(runningMessage);
		});
		process.on('SIGINT', async () => {
			await mongooseService.disconnect();
			process.exit(0);
		});
	} catch (error) {
		console.error('Error starting the server:', error);
		process.exit(1);
	}
};

startServer();
