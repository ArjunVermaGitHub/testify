import mongoose from "mongoose"

const QuizSchema = mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    heading:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    numberOfQuestions:{
        type:Number,
        required:true
    },
    listOfIDs:{
        type:Array,
        required:true
    }
})
export default mongoose.model('Quiz', QuizSchema)