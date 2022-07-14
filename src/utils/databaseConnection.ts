import mongoose from "mongoose";

const URLcluster:string="mongodb+srv://projecto1:projecto1@trivia.zhwqbyq.mongodb.net/test?retryWrites=true&w=majority";

const connection= ()=>{
    mongoose.connect(URLcluster)
    .then(()=>{
        console.log('Connecting to social database')
    })
    .catch((error)=>{
        console.log('Cant connect to database')
        console.error(error)
        process.exit(1)
    })
}

export default connection