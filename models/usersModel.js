const mongoose = require("../config/mongodb")
const errorMessage = require("../util/errorMessage")
const validators = require("../util/validators")
//encriptar las password
const bcrypt = require("bcrypt")

//Crear el schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio]
    },
    email:{
        type: String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        unique:true
    },
    password:{
        type: String,
        validate:{
            validator:function(value){
                return validators.isGoodPassword(value)
            },
            message:errorMessage.USERS.passwordIncorrect
        }
    }
})
userSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()
})
module.exports = mongoose.model("users",userSchema)