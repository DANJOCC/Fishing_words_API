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
exports.bouncer = void 0;
const user_model_1 = require("../models/user.model");
class Bouncer {
    register(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, tlf, password } = request.body;
            const newUser = yield user_model_1.user.findOne({ username });
            if (newUser !== null) {
                newUser.tlf === tlf ? reply.status(403).send({ msg: 'User already exist, change phone number' }) :
                    reply.status(403).send({ msg: 'User already exist, change username' });
            }
            else {
                const newUser = yield new user_model_1.user({
                    username,
                    tlf,
                    password
                });
                yield newUser.save();
                // const sms={
                //     from:'fishingwordsprojectomovil@gmail.com',
                //     to: email,
                //     subject:'codigo de validacion',
                //     text: 'prueba'
                // }
                // const sender= nodemailer.createTransport({
                //   host: 'smtp.gmail.com',
                //   port: 465,
                //   secure: true,
                //   auth:{
                //     user:'fishingwordsprojectomovil@gmail.com',
                //     pass:'tjelebbbkuxgekgt'
                //   }
                // })
                // console.log(sender)
                // sender.sendMail(sms, (error, info)=>{
                //   if (error) {
                //     console.log(error);
                //   } else {
                //     console.log('Email enviado: ' + info.response);
                //   }
                // })
                reply.status(201).send({ msg: 'succesful sing up' });
            }
        });
    }
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = request.body;
            console.log(username);
            const newUser = yield user_model_1.user.findOne({ username });
            if (newUser === null) {
                reply.status(404).send({ msg: 'User not found' });
            }
            else if (newUser !== null && newUser.password !== password) {
                reply.status(403).send({ msg: 'wrong password' });
            }
            else {
                reply.status(200).send({ msg: 'welcome', username });
            }
        });
    }
    profile(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = request.query;
            if (username === undefined) {
                reply.status(404).send({ msg: 'username not found, please try again' });
            }
            else {
                const newUser = yield user_model_1.user.findOne({ username });
                if (newUser !== null) {
                    const { tlf, password } = newUser;
                    reply.status(200).send({ username, tlf, password });
                }
                else {
                    reply.status(404).send({ msg: 'username not found, please try again' });
                }
            }
        });
    }
}
exports.bouncer = new Bouncer();
