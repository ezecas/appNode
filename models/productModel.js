const mongoose = require("../config/mongodb")
//Crear el schema
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo nombre es obligatorio"],
        minLength:[3,"El campo nombre debe contener al menos 3 caracteres"],
        uppercase: true
    },
    price:{
        type:Number,
        min:[0, "El precio no puede ser menos que 0"]
    },
    code:{
        type: String,
        minLength: [4,"El codigo debe contener al menos 4 caracteres"],
        maxLength: [10,"El codigo debe contener como maximo 10 caracteres"],
        unique: true,
        uppercase: true
    },
    description:{
        type:String,
        maxLength: [255,"La descripció debe contener como maximo 255 caracteres"],
    },
    quantity:{
        type:Number,
    }
})
module.exports = mongoose.model("products",productSchema)