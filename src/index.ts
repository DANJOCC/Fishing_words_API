import { Server } from "http";
import build from "./server/server";
import connection from "./utils/databaseConnection";

connection();

const app= build({
    logger:{
        level: 'info',
        transport:{
            target:'pino-pretty'
        }
    }
})

app.listen({port: 3000}, (err,address)=>{
    if(err){
        app.log.error(err);
        process.exit(1)
    }
    else{
        app.log.info(`Server run in ${address}`)
    }
})