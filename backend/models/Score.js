import mongoose from "mongoose"

const ScoreSchema = mongoose.Schema({
    value:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
export default mongoose.model('Score', ScoreSchema)