import { Server as IOServer, Socket } from 'socket.io';
import { Server } from 'http';

export default function setupSocket(server: Server): IOServer {
	const io = new IOServer(server);

	io.on('connection', (socket: Socket) => {
		console.log('A user connected:', socket.id);

		socket.on('join', (room) => {
			socket.join(room);
		});

		socket.on('location', ({ room, lat, lng }) => {
			socket.to(room).emit('location', { lat, lng });
		});

		socket.on('disconnect', () => {
			console.log('A user disconnected:', socket.id);
		});
	});

	return io;
}
