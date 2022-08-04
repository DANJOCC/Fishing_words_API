import Fastify, { fastify } from "fastify";
import Bouncer from "./routes/bouncer.routes";
import connection from "./utils/databaseConnection";
import fastifyJwt from "@fastify/jwt";
import socketioServer from "fastify-socket.io";
import cors from "@fastify/cors";
import playZone from "./controllers/room.controller";
import sixLetters from "./utils/sixLetters"
import fiveLetters from "./utils/fiveLetters"
import fourLetters from "./utils/fourLetters"
import { rankingBoard } from "./controllers/ranking.controller";
connection();

const app= Fastify({ logger:true
    /*{
    level: 'info',
    transport:{
        target:'pino-pretty'
    }
    }*/
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

        

        socket.on('connected', (roomConfig:any)=>{
            const config=roomConfig.config
            let arrayLetters:Array<String>=[]
            if(config.length==6){
                arrayLetters=sixLetters
            }
            else if(config.length==5){
                arrayLetters=fiveLetters
            }
            else{
                arrayLetters=fourLetters
            }

            if(roomConfig.owner){
                const roomId='room-'+Math.floor(Math.random()*1000)
                
                const words=[]
                for (let index = 0; index < config.rounds; index++) {
                    const rand=Math.floor(Math.random()*arrayLetters.length)
                    const element = arrayLetters[rand];
                    console.log(element)
                    words.push(element)
                }
                socket.join(roomId)
                playZone.addRoom(roomId, socket.id, config, words)
                socket.emit('setWords', {words, roomId})
                app.log.info(`nueva sala creada ${roomId}`)
            }
            else if(!playZone.addRoomieInRoom(roomConfig.id,socket.id)){
                app.log.info('esta pelando bola ', socket.id)
                socket.emit('waitForRoom')
            }
            else{
                socket.join(roomConfig.id)
                const room=playZone.getRoom(socket.id)
                const config=room?.config
                const words=room?.words
                const roomId=room?.id
                socket.emit('state', {config,words,roomId})
                app.io.in(roomConfig.id).emit('newUser',socket.id)
                app.log.info(`${socket.id} se unio a ${roomConfig.id}`)
            }
            
        })

        socket.on('exit',()=>{
            app.log.info(`el mamahuevo ${socket.id} se desconecto, cojanselo mas duro`)
            const room=playZone.getRoom(socket.id)
            if(room!==null){
                app.io.in(room.id).disconnectSockets(true);
                playZone.deleteRoom(socket.id)
            }
        })


        socket.on('updateRanking',(update:any)=>{
            const {username,newVictorie, mode}=update
            rankingBoard.updateRanking(username,newVictorie,mode)
            
        })
        socket.on('endGame',(results:any)=>{
           const{winner}=results
           const room=playZone.getRoom(socket.id)
           if(room!==null && winner!==null){
            app.io.in(room.id).emit('endGame', winner);
            }
            if(room!==null){
                app.io.in(room.id).emit('endGame', null);
            }
            
        })


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

app.listen({ port: Number(process.env.PORT || 3000), host:/*'192.168.1.103'*/'0.0.0.0'}, (err,address)=>{
    if(err){
        app.log.error(err);
        process.exit(1)
    }
    else{
        app.log.info(`Server run in ${address}`)
    }
})