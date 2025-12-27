
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/UserPrimaryDetails")
.then(()=>{
    console.log("Connection is Sucessfull");
})
.catch((err)=>{
    console.log(err);
})