
const express=require("express")
const {UserModel}=require("../model/User.model")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()

const bcrypt=require("bcrypt")



userRouter.post("/register", async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body

    try{

        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"error hai","error":err.message})
            } else{
                const user= new UserModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send({"msg":"reister succesfull"})
            }
        })
    }catch(err){
        req.send({"msg":"Somting wrong input"})
    }
})

userRouter.post("/login",async(req,res)=>{

     const {email,password}= req.body
     try{

        const user = await UserModel.find({email})

        if(user.length>0){
            bcrypt.compare(password,user[0].password, (err, results)=>{

                if(results){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"login Successful","toekn":token})
                } else{
                    res.send({"msg":"Somthig wrong "})
                }
            })
        }  else{

            res.send({"msg":"somthing wrong input"})
        }
     } catch(err){
      console.log("error",err.message)
     }
})



module.exports={
    userRouter
}