const mongoose= require ("mongoose");
const Schema=mongoose.Schema;

const exerciseSchema = new Schema({
    description: String,
    duration: Number,
    date: Date,
})

const userSchema = new Schema({
    username:String,
    log:[exerciseSchema],
    count:{
        type:Number,
        default:0,
    }
})

module.exports=mongoose.model("User",userSchema);
