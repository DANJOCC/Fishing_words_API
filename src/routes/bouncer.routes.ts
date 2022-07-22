import fastify, { FastifyInstance, FastifyPluginCallback, FastifyReply } from "fastify";
import { bouncer } from "../controllers/bouncer.controller";
import { CustomRequest } from "../types/UserRequestBody.type";
const Bouncer: FastifyPluginCallback= async (fastify: FastifyInstance, opt:any, done:any)=>{
    const AuthOptions={
        onRequest: (request: CustomRequest, reply: FastifyReply, done: any)=>{
                const err=null;
                const auth=request.headers.authorization;
                if(auth===undefined){
                        reply.status(500).send({msg:'permissed denied, bad authorization'})
                }
                else{
                        try{
                                const token= auth.split(' ')[1];
                                fastify.jwt.verify(token);
                        }catch(error){
                                reply.status(500).send({msg:'permissed denied, wrong token', error});
                        }
                }
                        
                done(err);
        }
    }
    const logInOptions={
        preSerialization: (request: CustomRequest, reply: FastifyReply, payload: any, done: any)=>{
                const err=null;
                if(payload.msg==='welcome'){
                        const newPayload={...payload,token: fastify.jwt.sign({payload}, {expiresIn: '24h'})}
                         done(err, newPayload);
                }
                else{
                        done(err, payload);
                }
        }
}

    fastify.post("/signUp", bouncer.register)
    fastify.post("/login", logInOptions,bouncer.login)
    fastify.get("/profile", AuthOptions,bouncer.profile)
    fastify.get("/isRegisterTlf", AuthOptions, bouncer.VerifyTlf)
    done()
}

export default Bouncer