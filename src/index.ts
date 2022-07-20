import Fastify, { fastify } from "fastify";
import Bouncer from "./routes/bouncer.routes";
import connection from "./utils/databaseConnection";
import fastifyJwt from "@fastify/jwt";
import socketioServer from "fastify-socket.io";
import cors from "@fastify/cors";
import playZone from "./controllers/room.controller";
import { isObjectBindingPattern } from "typescript";
connection();

const app= Fastify({ logger:
    {
    level: 'info',
    transport:{
        target:'pino-pretty'
    }
    }
});
app.register(Bouncer);
app.register(cors);
app.register(fastifyJwt, {
    secret: 'papi no me robeis :('
})
app.register(socketioServer);

app.ready(err=>{
    if(err) throw err;
    app.io.on('connection', (socket:any)=>{
        console.info('Player connected!!!!! everyone!!! lets fuck the new one!!!', socket.id)

        if(playZone.getRooms()===0){
            playZone.addRoom('room -'+socket.id, socket.id)
            app.log.info('nueva sala creada', socket.id)
        }
        else if(!playZone.addRoomieInRoom(socket.id)){
            app.log.info('esta pelando bola ', socket.id)
            socket.emit('waitForRoom')
        }
        else
        {
            const room=playZone.getRoom(socket.id)
            if(room!==null && room.players.length===4){
                playZone.DeleteAwaitRoomie(room.owner)
                app.io.in(room.id).emit('newUser', socket.id)
            }
            else if(room!==null && room.players.length<4){
                app.io.in(room.id).emit('newUser', socket.id)
                app.log.info(`el pelabola ${socket.id} entro en la sala ${room.id}`)
            }
        }
        socket.on('disconnect',()=>{
            app.log.info(`el mamahuevo ${socket.id} se desconecto, cojanselo mas duro`)
            const room=playZone.getRoom(socket.id)
            if(room!==null){
                app.io.in(room.id).disconnectSockets(true);
                playZone.deleteRoom(socket.id)
            }
        })
    })
})

app.listen({ port: Number(process.env.PORT || 3000), host:'192.168.1.103'/*'0.0.0.0'*/}, (err,address)=>{
    if(err){
        app.log.error(err);
        process.exit(1)
    }
    else{
        app.log.info(`Server run in ${address}`)
    }
})