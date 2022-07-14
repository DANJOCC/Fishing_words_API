import fastify, { FastifyInstance, FastifyPluginCallback } from "fastify";
import { bouncer } from "../controllers/bouncer.controller";
const Bouncer: FastifyPluginCallback= async (fastify: FastifyInstance, opt:any, done:any)=>{
    fastify.post("/singUp", bouncer.register)
    fastify.post("/login", bouncer.login)
    //fastify.put("/profile", bouncer.profile)
    done()
}

export default Bouncer