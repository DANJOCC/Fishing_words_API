"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const bouncer_routes_1 = __importDefault(require("../routes/bouncer.routes"));
function build(opts = {}) {
    const app = (0, fastify_1.default)(opts);
    app.register(bouncer_routes_1.default);
    return app;
}
exports.default = build;
