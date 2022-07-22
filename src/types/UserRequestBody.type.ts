import { FastifyRequest } from "fastify"
import { User } from "../interfaces/user.interface"

export  type CustomRequest= FastifyRequest<{ //Modificacion del tipo FastifyRequest para manejo de body
    Body: User,
    Querystring:{
        username:string
        tlf:string
    }
}>