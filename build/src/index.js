"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const bouncer_routes_1 = __importDefault(require("./routes/bouncer.routes"));
const databaseConnection_1 = __importDefault(require("./utils/databaseConnection"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const cors_1 = __importDefault(require("@fastify/cors"));
const room_controller_1 = __importDefault(require("./controllers/room.controller"));
(0, databaseConnection_1.default)();
const app = (0, fastify_1.default)({ logger: true
    /* {
     level: 'info',
     transport:{
         target:'pino-pretty'
     }
     }*/
});
app.register(bouncer_routes_1.default);
app.register(cors_1.default);
app.register(jwt_1.default, {
    secret: 'papi no me robeis :('
});
app.register(fastify_socket_io_1.default);
app.ready(err => {
    if (err)
        throw err;
    app.io.on('connection', (socket) => {
        console.info('Player connected!!!!! everyone!!! lets fuck the new one!!!', socket.id);
        socket.on('connected', () => {
            if (room_controller_1.default.getRooms() === 0) {
                room_controller_1.default.addRoom('room -' + socket.id, socket.id);
                app.log.info('nueva sala creada', socket.id);
            }
            else if (!room_controller_1.default.addRoomieInRoom(socket.id)) {
                app.log.info('esta pelando bola ', socket.id);
                socket.emit('waitForRoom');
            }
            else {
                const room = room_controller_1.default.getRoom(socket.id);
                if (room !== null && room.players.length === 4) {
                    room_controller_1.default.DeleteAwaitRoomie(room.owner);
                    app.io.in(room.id).emit('newUser', socket.id);
                }
                else if (room !== null && room.players.length < 4) {
                    app.io.in(room.id).emit('newUser', socket.id);
                    app.log.info(`el pelabola ${socket.id} entro en la sala ${room.id}`);
                }
            }
        });
        socket.on('exit', () => {
            app.log.info(`el mamahuevo ${socket.id} se desconecto, cojanselo mas duro`);
            const room = room_controller_1.default.getRoom(socket.id);
            if (room !== null) {
                app.io.in(room.id).disconnectSockets(true);
                room_controller_1.default.deleteRoom(socket.id);
            }
        });
    });
});
app.listen({ port: Number(process.env.PORT || 3000), host: /*'192.168.1.103'*/ '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    else {
        app.log.info(`Server run in ${address}`);
    }
});
