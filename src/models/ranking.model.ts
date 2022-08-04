import { Model, model, Schema } from "mongoose";
import { UserRanking } from "../interfaces/ranking.interface";

const userSchema= new Schema<UserRanking>({
    username: {type: String, required:true},
    victories: {type: Object, required:true},
    gamesWon: {type: Number, required: true},
    gamesPlayed: {type: Number, required: true},
})

export const userRanking:Model<UserRanking>=model('users', userSchema);