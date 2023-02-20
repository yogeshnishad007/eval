
const express= require("express")

const {NoteModel}=require("../model/Note.model")

const jwt=require("jsonwebtoken")
const noteRouter=express.Router()



noteRouter.get("/", async(req,res)=>{
    const token= req.headers.authorization

    jwt.verify(token, "masai", async(err,decoded)=>{
        if(decoded){

            try{

                const notes= await NoteModel.find({user:decoded?.userID})

                res.send(notes)
            }catch(err){
                   
                res.send({"msg":"Not Found ","eroor":err.message})
            }
        } else{
            res.send({"msg":"cant be reach"})
        }
    })
})


   noteRouter.post("/top",async(req,res)=>{
              const payload=req.body
              const note= new NoteModel(payload)
              await note.save()

              res.send({"msg":"Note here"})
   
   })


   noteRouter.delete("/delete/:id", async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID})

    res.send({"msg":`The user can dleted ${noteID}post`})

   })

   noteRouter.patch("/update/:id", async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndUpdate({_id:noteID},req.body)

    res.send({"msg":`The user can updated ${noteID}post`})

   })

   module.exports={
    noteRouter
   }