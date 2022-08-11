const usersModel = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports={
    
    /* GET products listing. */
    getAll: async function(req, res, next) {
        try{
            const users = await usersModel.find()
            res.status(200).json(users)
        }catch(e){
            res.json(e.message)
        }
  },
    create: async function(req, res, next) {
        try{
            const user = new usersModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const document = await user.save()
            res.status(201).json(document)
        }catch(e){
            console.log(e)
            // res.json(e.message)
            next(e)
        }
        
        
    },
    login: async function(req, res, next) {
        try{
            const user = await usersModel.findOne({email:req.body.email})
            if(!user){
                res.json({message:"Email incorrecto"})
                return
            }
            if(bcrypt.compareSync(req.body.password,user.password)){
                const token = jwt.sign({userId:user._id,rol:"admin"},req.app.get("secretKey"),{expiresIn:"1h"})
                res.status(201).json({token})
            }else{
                res.json({message:"Contraseña incorrecta"})
                return
            }
            
        }catch(e){
            console.log(e)
            // res.json(e.message)
            next(e)
        }
        
        
    }
}