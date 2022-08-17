import mongoose from "mongoose"

const QuestionSchema = mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    question:{
        type:String,
        unique:true,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    correctOptionNo:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        // required:true
    }
}
)
export default mongoose.model('Question', QuestionSchema)