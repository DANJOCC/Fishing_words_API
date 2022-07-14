
import build from "./server/server";
import connection from "./utils/databaseConnection";

connection();

const app= build({
    logger:true
})

app.listen({ port: Number(process.env.PORT || 3000), host: '0.0.0.0'}, (err,address)=>{
    if(err){
        app.log.error(err);
        process.exit(1)
    }
    else{
        app.log.info(`Server run in ${address}`)
    }
})