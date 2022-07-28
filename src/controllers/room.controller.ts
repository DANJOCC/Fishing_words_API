
import { Room, roomConfig } from "../interfaces/room.interface";
import { Rommie } from "../interfaces/roomie.interface";



class Roomies {
    rooms:Array<Room>=[] //Salas de juego (rooms) abiertas
    roomies:Array<Rommie>=[] //Usuarios en espera


    public addRoomieInRoom = (id:string)=>{
        const room = this.rooms.find(room => room.players.length<4);
        if(room!==undefined){
            room.players.push(id)
            return true
        }
        else{
            return false
        }
    }

    public addRoom(room:string, playerID:string, config:roomConfig){
            const players=[playerID]
            this.roomies.push({room, id: playerID})
            return this.rooms.push({id: room,players, owner:playerID, config})
    }

    public getRommies=()=>{
        return this.roomies.length;
    }
    public getRooms=()=>{
        return this.rooms.length;
    }

    public DeleteAwaitRoomie=(playerID:string)=>{
        const player= this.roomies.find(user => playerID === user.id)
        if(player!==undefined){
            const index = this.roomies.findIndex(user => user.id == player.id);
        this.roomies.splice(index,1)
        }
        return player;
    }


    public getRoom=(playerID:string)=>{
      for (let index = 0; index < this.rooms.length; index++) {
            const room =this.rooms[index];
            if(room.players.includes(playerID)){
                return room
            }
        }
        return null;
    }

    public deleteRoom=(playerID:string)=>{
        const roomToDelete=this.getRoom(playerID)
        let index
        if(roomToDelete !== undefined){
             index =this.rooms.findIndex(room => room.id===roomToDelete?.id);
            return this.rooms.splice(index,1)[0];
        }
        else{
            return false
        }
    }
}

const playZone=new Roomies()

export default playZone