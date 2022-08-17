import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import mongodb from "mongodb"
import Question from "./models/Question.js"
import Quiz from "./models/Quiz.js"
import Score from './models/Score.js'
import User from './models/User.js'
import cors from "cors"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const app=express()
app.use(express.json())
dotenv.config()

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}




const uri=process.env.MONGODB_URI
const port=process.env.PORT


mongoose.connect(uri,
    {
        // poolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true
    })
    .catch(err=>{
        console.error(err.stack)
        process.exit(1)
    }).then(async client=>{
        app.listen(port, ()=>{
            console.log("Listening on port "+port)
        })
    })

app.get("/",async(req,res,next)=>{
    res.send("Welcome to the backend")
})
// Get all questions, , need to also get them from array
app.get("/api/questions", async (req,res,next)=>{
    try {
        console.log(req.query.questions)
        let q
        if(req.query.questions===undefined || req.query.questions?.length===0)
            q=await Question.find()
        else
            q=await Question.find().where('id').in(req.query.questions).exec();
        res.json(q)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

//Post a question
app.post("/api/question", async (req,res,next)=>{
    const q = new Question({
        id:req.body.id?req.body.id:Date.now(),
        question:req.body.question,
        options:req.body.options,
        correctOptionNo:req.body.correctOptionNo,
        category:req.body.category?req.body.category:"misc"
    })
    try{
        console.log(q.options.indexOf(q.correctOption))
        //if correctoption not in options, throw err
        if(q.correctOptionNo<1)
            throw {message: "The correct option number cant be less than 1"}
        if(q.options.length<q.correctOptionNo)
            throw {message: "The correct option number is out of the range of option numbers"}
        const newQuestion=await q.save()
        res.status(201).json(newQuestion)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//Get question by ID
app.get("/api/question/:id", async (req,res,next)=>{
    try{
        const q=await Question.find({id:req.params.id})
        res.status(201).json(q)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

app.get("/api/score",  async (req,res,next)=>{
    try {
        const s=await Score.find()
        res.json(s)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

app.post("/api/score", async (req,res,next)=>{
    console.log(req.body)
    const s = new Score({
        ...req.body
    })
    try{
        let newScore=await s.save()
        res.status(201).json(newScore)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

app.get("/api/quizzes", async (req,res,next)=>{
    try {
        const q=await Quiz.find()
        res.json(q)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
app.post("/api/quiz", async (req,res,next)=>{
    const q = new Quiz({
        id:req.body.id?req.body.id:Date.now(),
        heading:req.body.heading,
        description:req.body.description,
        numberOfQuestions:req.body.numberOfQuestions,
        listOfIDs:req.body.listOfIDs
    })
    try{
        if(q.numberOfQuestions>q.listOfIDs.length)
            throw {message:"You havent provided enough IDs or have set too high a number of questions"}
        const newQuiz=await q.save()
        res.status(201).json(newQuiz)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
app.get("/api/quiz/:id", async (req,res,next)=>{
    try{
        const quiz=await Quiz.find({id:req.params.id})
        res.status(201).json(quiz)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

app.post("/api/register", async(req,res,next)=>{
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})
app.post("/api/login", async(req,res,next)=>{
    console.log("API called")
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        console.log(await bcrypt.compare(password, user.password ))
        if(user && (await bcrypt.compare(password, user.password ))){
            res.json({
                id: user.id,
                name:user.name,
                email:user.email,
                token: generateToken(user.id)
            })
        }
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

app.put("/api/user/:id", async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {new:true})
    res.json(user)
})

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}


// app.post("/api/questions",(req,res,next)=>{
//     if( req.body.constructor!==Array)
//         res.status(400).send('Please send an array')
//     if(req.body.length!==2)
//         res.status(400).send('The array should have exactly 2 entries, 1: array of 4 options, 2: correct option')
    
//     if(req.body[0].length!==4 || req.body[0].constructor!==Array)
//         res.status(400).send('The first element should be an array with 4 options')
//     if(req.body[0].indexOf(req.body[1])==-1)
//         res.status(400).send('The correct option is not in the list of options')
        
//     let question=[
//         "Q"+questions.length+req.body[1],
//         req.body[0],
//         req.body[1]
//     ]
//     questions.push(question)
//     res.send(question)
// })


const db=mongoose.connection
db.on('error', error=>console.error(error))
db.once('open',()=>console.log("Connected to DB"))

app.use(cors(corsOptions))  // Use this after the variable declaration
app.listen(3001)