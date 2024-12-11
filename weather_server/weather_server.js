import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";
import body from "body-parser";
import cors from 'cors';
import 'dotenv/config';


const server = express()
const JWT_SECRET = "Gowtham_10";
const port = process.env.Server_port || 5000;

server.use(body.urlencoded({extended:true,limit:'100mb'}));
server.use(body.json({limit:'100mb'}));
server.use(cors({ origin: process.env.React_path }));

console.log(process.env.Data_base_pass)

const db = new pg.Client({
    host:"localhost",
    password:process.env.Data_base_pass,
    port:process.env.DB_port,
    database:process.env.Select_Data_base,
    user:process.env.Data_base_user

}) 

db.connect()

server.post("/register",async(req,res)=>{

    try {
        
        const {email,pass} = req.body;
       console.log(email,pass)
   
       const hashvalue = await bcrypt.hash(pass, 12,)
   
   console.log(hashvalue)
   
   const insert = await db.query("insert into account_detail (email,pass) values ($1,$2) RETURNING *",[email,hashvalue])
   
   const token = jwt.sign({ "email":insert.rows.email }, JWT_SECRET);
   
   console.log(insert.rows)
   
   res.status(201).json([insert.rows,{"token":token}])
    } catch (error) {
        res.statusCode(401).send("success")
    }
    
   
    
})


server.post("/login",async(req,res)=>{
    try{

        const {email,pass} = req.body;
        console.log(email)
       
       const responce = await db.query("select * from account_detail where email = $1",[email])
   
       console.log(responce.rows)
   
       if (!(responce.rows[0])){
           res.json({message:"username not exist"})
           return
       }
   
       let hash = responce.rows[0].pass;
       const value = await bcrypt.compare(pass, hash)
   
       if (value){
           const token = jwt.sign({ "email":email }, JWT_SECRET);
           console.log(token)
           res.json({message:"valied user",Auth:true,token:token})
       }else{
       
           res.json({message:"invalied username or password",Auth:false})
       }
    }catch(error){
        res.statusCode(401).send("success")
    }
})

server.post("/userCheck",async(req,res)=>{
    try{
        const {email} = req.body;
    
        const responce = await db.query("select * from account_detail where email = $1",[email])
        console.log(responce.rows)
        
        res.json(responce.rows[0]?true:false)

    }
    catch(error){
        res.statusCode(401).send("success")
    }
 
})

server.listen(port,()=> console.log(`server is running in port ${port}`))
