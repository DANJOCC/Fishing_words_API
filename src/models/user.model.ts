import { Model, model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema= new Schema<User>({
    username: {type: String, required:true},
    tlf: {type: String, required:true},
    password: {type: String, required: true},
})

export const user:Model<User>=model('users', userSchema);