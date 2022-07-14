"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const databaseConnection_1 = __importDefault(require("./utils/databaseConnection"));
(0, databaseConnection_1.default)();
const app = (0, server_1.default)({
    logger: true
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
