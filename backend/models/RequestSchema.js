
const mongoose = require('mongoose');

const ReqSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USERDATA",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USERDATA",
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true,
    },
    statusCode:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending",
    },
    date:{
        type:Date,
        default:Date.now,
    },
    

})

const UserReq = new mongoose.model("Requests",ReqSchema);

module.exports = UserReq;