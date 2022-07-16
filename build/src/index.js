"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const bouncer_routes_1 = __importDefault(require("./routes/bouncer.routes"));
const databaseConnection_1 = __importDefault(require("./utils/databaseConnection"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
(0, databaseConnection_1.default)();
const app = (0, fastify_1.default)({ logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty'
        }
    } });
app.register(bouncer_routes_1.default);
app.register(cors_1.default);
app.register(jwt_1.default, {
    secret: 'papi no me robeis :('
});
app.listen({ port: Number(process.env.PORT || 3000), host: '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    else {
        app.log.info(`Server run in ${address}`);
    }
});
