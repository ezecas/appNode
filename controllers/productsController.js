const productsModel = require("../models/productModel")
const errorMessage = require("../util/errorMessage")
module.exports={
    
    /* GET products listing. */
    getAll: async function(req, res, next) {
        try{
            const products = await productsModel.find().populate("category") //con populate() mostramos todos los datos de las colecciones relacionadas
            if (!products){
                res.status(200).json(errorMessage.GENERAL.notFound)
                return
            }
            res.status(200).json(products)
        }catch(e){
            console.log(e)
        }
  },
    /* GET products by ID. */
    getById: async function(req, res, next) {
        try{
            const product = await productsModel.findById(req.params.id).populate("category")
            if(!product){
                res.status(200).json(errorMessage.GENERAL.notFound)
                return
              }
            res.status(200).json(product)
        }catch(e){
            console.log(e)
        }       
    },

    /* GET new products. */
    getNewProducts: async function(req, res, next) {
        try{
            const products = await productsModel.find({new:true}).populate("category")
            if (!products){
                res.status(200).json(errorMessage.GENERAL.notFound)
                return
            }
            res.status(200).json(products)
        }catch(e){
            console.log(e)
        }       
    },

    /* SAVE product. */
    create: async function(req, res, next) {
        try{
            const product = new productsModel({
                name:req.body.name,
                price:req.body.price,
                code:req.body.code,
                description:req.body.description,
                quantity:req.body.quantity,
                category:req.body.category,
                new:req.body.new

            })
            const document = await product.save()
            if(!document){
                res.status(200).json(errorMessage.GENERAL.saveError)
                return
            }
            res.status(201).json(document)
        }catch(e){
            res.json(e.message)
        }
    },
    /* UPDATE product. */
    update: async function(req, res, next) {
        console.log(req.body)
        try{
            if(!await productsModel.findById(req.params.id)){
                res.status(200).json(errorMessage.GENERAL.updateError)
                return
              }
            const document = await productsModel.updateOne({_id:req.params.id},req.body)
            res.status(200).json(document)
        }catch(e){
            console.log(e)
        }
    },
    /* DELETE product. */
    delete: async function(req, res, next) {
        console.log(req.params.id)
        try{
            if(!await productsModel.findById(req.params.id)){
                res.status(200).json(errorMessage.GENERAL.deleteError)
                return
            }
            const document = await productsModel.deleteOne({_id:req.params.id})
            res.status(200).json(document)
        }catch(e){
            console.log(e)
        }
    }
}