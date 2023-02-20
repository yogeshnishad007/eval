const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./route/User.route")
const {noteRouter}=require("./route/Note.route")
const {authenticate}=require("./middleware/auth.middleware")
require("dotenv").config()

const cors=require("cors")

const app=express()
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{

    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",noteRouter)


app.listen(process.env.port,async(req,res)=>{

    try{
        await connection
        console.log("DB is Connect")
    }catch(err){
          console.log("error",err.message)
    }

    console.log(`port ${process.env.port} running` )
})

