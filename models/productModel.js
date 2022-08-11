const mongoose = require("../config/mongodb")
const errorMessage = require("../util/errorMessage")
//Crear el schema
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        minLength:[3,errorMessage.GENERAL.minlength],
        maxLength: [20,errorMessage.GENERAL.maxlength],
        uppercase: true
    },
    price:{
        type:Number,
        min:[0, errorMessage.PRODUCT.minPrice]
    },
    code:{
        type: String,
        minLength: [3,errorMessage.GENERAL.minlength],
        maxLength: [20,errorMessage.PRODUCT.maxlength],
        unique: true,
        uppercase: true
    },
    description:{
        type:String,
        maxLength: [255,errorMessage.GENERAL.maxlength],
    },
    quantity:{
        type:Number,
    },
    category:{
        type: mongoose.Schema.ObjectId, //Id de la categoria que se quiere asociar
        ref:"categories" //Coleccion con la que se hace la relacion
    },
    new:{
        type:Boolean
    }
})
module.exports = mongoose.model("products",productSchema)