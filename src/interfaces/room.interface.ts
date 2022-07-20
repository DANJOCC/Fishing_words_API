import { Rommie } from "./roomie.interface";

export interface Room{
    id: string,
    players: Array<string>,
    owner:string
}