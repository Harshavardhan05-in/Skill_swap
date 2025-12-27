
const express = require('express');
const Users = require("./models/UsersSchema");
require("./db/connection")
const bcrypt = require('bcryptjs')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const corsOption = {
    origin:"http://localhost:5173",
    methods:"POST , GET , PATCH , PUT  ,DELETE",
    credentials:true
}
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());


const UserReq = require("./models/RequestSchema");

const authentication = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,"mynameisharshavardhanushakolafrombhushanraopet");
        const userLog = await Users.findOne({_id:verifyUser._id});
        req.user = userLog;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}
app.post("/signup",async(req,res)=>{
    try {
        const userData = req.body;
        if(req.body.password.length<5){
            res.status(402).send("Invalid");
        }
        if(req.body.password!==req.body.cpassword){
            res.status(401).send("Failed");
        }else{
            const hashPass = await bcrypt.hash(req.body.password,10);
            req.body.password = hashPass;
            req.body.cpassword = undefined;
            const newUser = new Users(userData);
            const result = await newUser.save();
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send(error);
        
    }
})

app.post("/login",async(req,res)=>{
    try {
        const userData = req.body;

        if(req.body.email.length===0 || req.body.password.length===0){
            res.status(401).send("Invalid ");
        }else{
            const validUser = await Users.findOne({email:userData.email});
            if(!validUser){
                res.status(404).send("User Not Exist");
            }else{

                const token = await validUser.createAuthToken();
                res.cookie("jwt",token,{
                    httpOnly:true
                });

                const isTrue = await bcrypt.compare(req.body.password,validUser.password);
                if(isTrue){
                    res.status(200).send(validUser);
                }
            }
        }
    } catch (error) {
        console.log("ERROR PART");
        res.status(500).send(error);
    }
})

app.get("/home",authentication,(req,res)=>{
    res.status(200).send(req.user);

})

app.put("/profile",async(req,res)=>{
    try {
        const data = req.body;
        const result = await Users.findByIdAndUpdate({_id:data._id},data);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get("/logout",(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).send("Logout");
})

app.delete("/delete/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await Users.findByIdAndDelete({_id:id});
        res.clearCookie("jwt");
        res.status(201).send(result);
    } catch (error) {
        console.log("ERR:",error);
    }
})

app.get("/allusers",async(req,res)=>{
    try {
        const result = await Users.find();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


app.post("/postreq",async(req,res)=>{
    try {
        const req1 = new UserReq(req.body);
        const result = await req1.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get("/getprofile/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await Users.findById({_id:id})
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get("/getreq/:id1/:id2",async(req,res)=>{
    try {
        const id1 = req.params.id1;
        const id2 = req.params.id2;
        const result = await UserReq.findOne({$and:[{senderId:id1},{receiverId:id2}]});
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get("/getsentreq/:id",async(req,res)=>{
    try {
        
        const result = await UserReq.find({senderId:req.params.id})
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get("/getreceivereq/:id",async(req,res)=>{
    try {
        const result = await UserReq.find({receiverId:req.params.id});
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.put("/updatereq/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const result = await UserReq.findByIdAndUpdate(id,req.body,{
            new:true
        });
        res.status(201).send(result);
    } catch (error) {
        console.log("ERROR:",error);
        res.status(500).send(error);
    }
})

app.listen(port,()=>{
    console.log(`Running On the Port Number ${port}`);
})