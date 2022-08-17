import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Please add an email']
    },
    password:{
        type:String,
        required:[true, 'Please add a password']
    },
    numberOfQuestions:{
        type:Number,
        // required:true
    },
    listOfIDs:{
        type:Object
        // required:true
    }
},
{
    timestamps:true
})
// UserSchema.methods.generateAuthToken = ()=>{
//     const token=jwt.sign({_id:this._id, process.env.JWTPRIVATEKEY, {expiresIn:"7d"}})
// }

export default mongoose.model('User', UserSchema)