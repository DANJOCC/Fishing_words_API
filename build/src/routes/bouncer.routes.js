"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bouncer_controller_1 = require("../controllers/bouncer.controller");
const Bouncer = (fastify, opt, done) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/singUp", bouncer_controller_1.bouncer.register);
    fastify.post("/login", bouncer_controller_1.bouncer.login);
    //fastify.put("/profile", bouncer.profile)
    done();
});
exports.default = Bouncer;
