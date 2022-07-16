import Fastify from "fastify";
import Bouncer from "./routes/bouncer.routes";
import connection from "./utils/databaseConnection";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
connection();

const app= Fastify({ logger:{
    level: 'info',
    transport:{
        target:'pino-pretty'
    }
}});
app.register(Bouncer);
app.register(cors);
app.register(fastifyJwt, {
    secret: 'papi no me robeis :('
})

app.listen({ port: 3000, host:'192.168.1.103'}, (err,address)=>{
    if(err){
        app.log.error(err);
        process.exit(1)
    }
    else{
        app.log.info(`Server run in ${address}`)
    }
})