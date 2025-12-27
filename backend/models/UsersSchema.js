
const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validater(val){
            if(!validator.isEmail(val)){
                throw new Error(" Invalid Email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    cpassword:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false,
        length:10
    },
    location:{
        type:String,
        required:false,
    },
    skillsKnow:{
        type:[String],
        required:false
    },
    skillsWantToLearn:{
        type:[String],
        required:false
    },
    tokens:[{
        token:{
            type:String
        }
    }
    ]
})

UserSchema.methods.createAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},"mynameisharshavardhanushakolafrombhushanraopet");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }

}

const Users = new mongoose.model("USERDATA",UserSchema);

module.exports = Users;