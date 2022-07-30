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
const sixLetters_1 = __importDefault(require("./utils/sixLetters"));
const fiveLetters_1 = __importDefault(require("./utils/fiveLetters"));
const fourLetters_1 = __importDefault(require("./utils/fourLetters"));
(0, databaseConnection_1.default)();
const app = (0, fastify_1.default)({ logger: true
    /*{
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
        socket.on('connected', (roomConfig) => {
            const config = roomConfig.config;
            let arrayLetters = [];
            if (config.length == 6) {
                arrayLetters = sixLetters_1.default;
            }
            else if (config.length == 5) {
                arrayLetters = fiveLetters_1.default;
            }
            else {
                arrayLetters = fourLetters_1.default;
            }
            if (roomConfig.owner) {
                const roomId = 'room-' + Math.floor(Math.random() * 1000);
                const words = [];
                for (let index = 0; index < config.rounds; index++) {
                    const rand = Math.floor(Math.random() * arrayLetters.length);
                    const element = arrayLetters[rand];
                    console.log(element);
                    words.push(element);
                }
                socket.join(roomId);
                room_controller_1.default.addRoom(roomId, socket.id, config, words);
                socket.emit('setWords', { words, roomId });
                app.log.info(`nueva sala creada ${roomId}`);
            }
            else if (!room_controller_1.default.addRoomieInRoom(roomConfig.id, socket.id)) {
                app.log.info('esta pelando bola ', socket.id);
                socket.emit('waitForRoom');
            }
            else {
                socket.join(roomConfig.id);
                const room = room_controller_1.default.getRoom(socket.id);
                const config = room === null || room === void 0 ? void 0 : room.config;
                const words = room === null || room === void 0 ? void 0 : room.words;
                const roomId = room === null || room === void 0 ? void 0 : room.id;
                socket.emit('state', { config, words, roomId });
                app.io.in(roomConfig.id).emit('newUser', socket.id);
                app.log.info(`${socket.id} se unio a ${roomConfig.id}`);
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
        socket.on('disconnect', () => {
            app.log.info(`el mamahuevo ${socket.id} se desconecto, cojanselo mas duro`);
            const room = room_controller_1.default.getRoom(socket.id);
            if (room !== null) {
                app.io.in(room.id).disconnectSockets(true);
                room_controller_1.default.deleteRoom(socket.id);
            }
        });
    });
});
app.listen({ port: Number(process.env.PORT || 3000), host: '192.168.1.103' /*'0.0.0.0'*/ }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    else {
        app.log.info(`Server run in ${address}`);
    }
});
