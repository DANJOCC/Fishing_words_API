import { FastifyReply, FastifyRequest } from "fastify";
import { user } from "../models/user.model";
import { CustomRequest } from "../types/UserRequestBody.type";
import nodemailer from 'nodemailer';
class Bouncer {
  

  

  public async register(request: CustomRequest, reply: FastifyReply, ):Promise<any> {
        const {username, tlf, password} = request.body
        const newUser= await user.findOne({username})
        if(newUser!==null){
          newUser.tlf===tlf ? reply.status(403).send({msg:'User already exist, change phone number'}):
                              reply.status(403).send({msg:'User already exist, change username'}) 
        }
        else{
          const newUser= await new user({
            username,
            tlf,
            password
          })
           await newUser.save()
          // const sms={
          //     from:'fishingwordsprojectomovil@gmail.com',
          //     to: email,
          //     subject:'codigo de validacion',
          //     text: 'prueba'
          // }
          // const sender= nodemailer.createTransport({
          //   host: 'smtp.gmail.com',
          //   port: 465,
          //   secure: true,
          //   auth:{
          //     user:'fishingwordsprojectomovil@gmail.com',
          //     pass:'tjelebbbkuxgekgt'
          //   }
          // })
          // console.log(sender)
          // sender.sendMail(sms, (error, info)=>{
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log('Email enviado: ' + info.response);
          //   }
          // })
          reply.status(201).send({msg:'succesful sing up'})
        }  
  }
  public async login(request: CustomRequest, reply: FastifyReply, ):Promise<any> {
        const {username, password} = request.body
        console.log(username)
        const newUser= await user.findOne({username})
        if(newUser===null){
          reply.status(404).send({msg:'User not found'})
        }
        else if(newUser!== null && newUser.password!==password){
          reply.status(403).send({msg:'wrong password'})
        }
        else{
          reply.status(200).send({msg: 'welcome', username})
        }  
  }
  public async profile(request: CustomRequest, reply: FastifyReply, ):Promise<any> {
     const {username}= request.query;
     if(username===undefined){
       reply.status(404).send({msg:'username not found, please try again'})
     }
     else{
      const newUser= await user.findOne({username})
      if(newUser!==null){
        const {tlf, password}=newUser
        reply.status(200).send({username, tlf, password})
      }
      else{
        reply.status(404).send({msg:'username not found, please try again'})
      }
     }
     }
     public async VerifyTlf(request: CustomRequest, reply:FastifyReply):Promise<any>{
      const sendtlf=request.query.tlf
      const tlf=`+${sendtlf}`
      
      const userTlf=await user.findOne({tlf})
      
      if(userTlf!==null){
        
        reply.status(200).send({IsRegister:true})
      }
      else{
        reply.status(200).send({IsRegister:false})
      }
     }
}

export const bouncer=new Bouncer()