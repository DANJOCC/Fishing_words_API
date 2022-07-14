"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URLcluster = "mongodb+srv://projecto1:projecto1@trivia.zhwqbyq.mongodb.net/fishing_words?retryWrites=true&w=majority";
const connection = () => {
    mongoose_1.default.connect(URLcluster)
        .then(() => {
        console.log('Connecting to social database');
    })
        .catch((error) => {
        console.log('Cant connect to database');
        console.error(error);
        process.exit(1);
    });
};
exports.default = connection;
