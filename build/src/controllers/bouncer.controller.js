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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bouncer = void 0;
const user_model_1 = require("../models/user.model");
const nodemailer_1 = __importDefault(require("nodemailer"));
class Bouncer {
    register(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = request.body;
            const newUser = yield user_model_1.user.findOne({ username });
            if (newUser !== null) {
                reply.status(403).send('User already exist');
            }
            else {
                const newUser = yield new user_model_1.user({
                    username,
                    email,
                    password
                });
                yield newUser.save();
                const sms = {
                    from: 'fishingwordsprojectomovil@gmail.com',
                    to: email,
                    subject: 'codigo de validacion',
                    text: 'prueba'
                };
                const sender = nodemailer_1.default.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'fishingwordsprojectomovil@gmail.com',
                        pass: 'tjelebbbkuxgekgt'
                    }
                });
                console.log(sender);
                sender.sendMail(sms, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email enviado: ' + info.response);
                    }
                });
                reply.status(201).send('succesful sing up');
            }
        });
    }
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = request.body;
            console.log(username);
            const newUser = yield user_model_1.user.findOne({ username });
            if (newUser === null) {
                reply.status(404).send('User not found');
            }
            else if (newUser !== null && newUser.password !== password) {
                reply.status(403).send('wrong password');
            }
            else {
                reply.status(200).send({ msg: 'Welcome ' + username, id: newUser.id });
            }
        });
    }
}
exports.bouncer = new Bouncer();
