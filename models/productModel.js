const mongoose = require("../config/mongodb")
//Crear el schema
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo nombre es obligatorio"],
        minLength:[3,"El campo nombre debe contener al menos 3 caracteres"]
    },
    price:Number,
    description:String,
    quantity:Number
})
module.exports = mongoose.model("products",productSchema)