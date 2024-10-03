import express from "express"
const router=express.Router()

let questions=[
    ["Q1D",["A","B","C","D"],"D"],
    ["Q2C",["A","B","C","D"],"C"],
    ["Q3A",["A","B","C","D"],"A"],
    ["Q4D",["A","B","C","D"],"D"],
    ["Q5B",["A","B","C","D"],"B"]
]

router.get("/",(req,res,next)=>{
    res.json({message:"Hi"})
})


router.get("/api/questions",(req,res,next)=>{
    res.json(questions)
})

router.get("/api/questions/:id",(req,res,next)=>{
    let id=parseInt(req.params.id)
    res.json(questions[id])
})
// router.post("/api/questions",(req,res,next)=>{
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

export default router