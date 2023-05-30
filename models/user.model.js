const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const studentSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
})

let saltRounds = 10;
studentSchema.pre("save", function(next){
    // console.log(this.password);
    bcrypt.hash(this.password, saltRounds)
    .then((hashedPassword)=>{
        console.log(hashedPassword);
        this.password = hashedPassword;
        next();
    })
    .catch((err)=>{
        console.log(err);
    })
})
const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;