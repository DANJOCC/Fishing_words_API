"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Roomies {
    constructor() {
        this.rooms = []; //Salas de juego (rooms) abiertas
        this.roomies = []; //Usuarios en espera
        this.addRoomieInRoom = (id) => {
            const room = this.rooms.find(room => room.players.length < 4);
            if (room !== undefined) {
                room.players.push(id);
                return true;
            }
            else {
                return false;
            }
        };
        this.getRommies = () => {
            return this.roomies.length;
        };
        this.getRooms = () => {
            return this.rooms.length;
        };
        this.DeleteAwaitRoomie = (playerID) => {
            const player = this.roomies.find(user => playerID === user.id);
            if (player !== undefined) {
                const index = this.roomies.findIndex(user => user.id == player.id);
                this.roomies.splice(index, 1);
            }
            return player;
        };
        this.getRoom = (playerID) => {
            for (let index = 0; index < this.rooms.length; index++) {
                const room = this.rooms[index];
                if (room.players.includes(playerID)) {
                    return room;
                }
            }
            return null;
        };
        this.deleteRoom = (playerID) => {
            const roomToDelete = this.getRoom(playerID);
            let index;
            if (roomToDelete !== undefined) {
                index = this.rooms.findIndex(room => room.id === (roomToDelete === null || roomToDelete === void 0 ? void 0 : roomToDelete.id));
                return this.rooms.splice(index, 1)[0];
            }
            else {
                return false;
            }
        };
    }
    addRoom(room, playerID) {
        const players = [playerID];
        this.roomies.push({ room, id: playerID });
        return this.rooms.push({ id: room, players, owner: playerID });
    }
}
const playZone = new Roomies();
exports.default = playZone;
