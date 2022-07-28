import { Rommie } from "./roomie.interface";

export interface roomConfig{
    time:Number,
    length:Number,
    rounds:Number,
    tries:Number,
}

export interface Room{
    config: roomConfig
    id: string,
    players: Array<string>,
    owner:string
}