const usersModel = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const errorMessage = require("../util/errorMessage")
module.exports={
    
    /* GET users listing. */
    getAll: async function(req, res, next) {
        try{
            const users = await usersModel.find()
            if (!users){
                res.status(200).json(errorMessage.GENERAL.notFound)
                return
            }
            res.status(200).json(users)
        }catch(e){
            res.json(e.message)
        }
    },

    /* GET user by ID. */
    getById: async function(req, res, next) {
        try{
            const user = await usersModel.findById(req.params.id)
            if(!user){
              res.status(200).json(errorMessage.GENERAL.notFound)
              return
            }
            res.status(200).json(user)     
        }catch(e){
          console.log(e)
        }       
    },

    /* SAVE user. */
    create: async function(req, res, next) {
        try{
            const user = new usersModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const document = await user.save()
            if(!document){
                res.status(200).json(errorMessage.GENERAL.saveError)
                return
              }
            res.status(201).json(document)
        }catch(e){
            next(e)
        }
        
    },
    login: async function(req, res, next) {
        try{
            const user = await usersModel.findOne({email:req.body.email})
            if(!user){
                res.json(errorMessage.USERS.credentialsInvalid)
                return
            }
            if(bcrypt.compareSync(req.body.password,user.password)){
                //generamos el Token
                const token = jwt.sign({userId:user._id},req.app.get("secretKey"),{expiresIn:"1h"})
                res.status(201).json({token})
            }else{
                res.json(errorMessage.USERS.credentialsInvalid)
                return
            }
            
        }catch(e){
            console.log(e)
            next(e)
        }
        
        
    }
}