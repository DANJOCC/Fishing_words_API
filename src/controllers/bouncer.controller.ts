import { FastifyReply, FastifyRequest } from "fastify";
import { user } from "../models/user.model";
import { CustomRequest } from "../types/UserRequestBody.type";

class Bouncer {
  public async register(request: CustomRequest, reply: FastifyReply, ):Promise<any> {
        const {username, email, password} = request.body
        const newUser= await user.findOne({username})
        if(newUser!==null){
          reply.status(403).send('User already exist')
        }
        else{
          const newUser= await new user({
            username,
            email,
            password
          })
          await newUser.save()
          reply.status(201).send('succesful sing up')
        }  
  }
  public async login(request: CustomRequest, reply: FastifyReply, ):Promise<any> {
        const {username,  password} = request.body
        console.log(username)
        const newUser= await user.findOne({username})
        if(newUser===null){
          reply.status(404).send('User not found')
        }
        else if(newUser!== null && newUser.password!==password){
          reply.status(403).send('wrong password')
        }
        else{
          reply.status(200).send({msg: 'Welcome '+username, id: newUser.id})
        }  
  }
  // public async profile(request: CustomRequest, reply: FastifyReply, ):Promise<any> {
  //   const {id}= request.body;
  //   if(id===undefined){
  //     reply.status(403).send('you need to be logged for this action')
  //   }
  //   else if(id!== undefined){
  //       const isUser=Object(request.session.get('user'))
  //         if(isUser!==undefined){
  //           const id=isUser
  //           const loggedUser=await user.findById(id.id)
  //           loggedUser !== undefined ? reply.status(201).send({profile: loggedUser}): reply.status(403).send('user not found')
  //         }
  //         else{
  //         reply.status(403).send('you need to be logged')
  //         }
  //       } 
        
  //   }
}

export const bouncer=new Bouncer()