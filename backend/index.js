const express = require("express");
const cors =require("cors");
const mongoose = require("mongoose");


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


const DB="mongodb+srv://Anil0791:Paliabhi@user.xpdxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(DB,{
                    useNewUrlParser:true,
                    useUnifiedTopology:true
}, ()=>{
    console.log("DB connected")
});

// create schema for user
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User=new mongoose.model("User",UserSchema);

// Routes

app.get("/",(req,res)=>{
    res.send("MY API")
})

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successful",user:user})
            }else{
                res.send({message:"Password did not match"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    })
})


app.post("/register",(req,res)=>{
    const {name,email,password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User Already registered"})
        } else{
            const user=new User({
                name,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send({message:"Successfully registered, Please Login Now "})
                }
            }) 
    }}) 
})

app.listen(9002,()=>{
    console.log("Server started at post 9002");
})