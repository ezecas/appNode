const categoryModel = require("../models/categoriesModel")
const errorMessage = require("../util/errorMessage")
module.exports={

  /* GET categories listing. */
    getAll:async function(req, res, next) {
      try{
        const categories = await categoryModel.find()
        if (!categories){
          res.status(200).json(errorMessage.GENERAL.notFound)
          return
        }
        res.json(categories)
      }catch(e){
        next(e)
      }
    },

    /* GET category by ID. */
    getById: async function(req, res, next) {
      try{
          const category = await categoryModel.findById(req.params.id)
          if(!category){
            res.status(200).json(errorMessage.GENERAL.notFound)
            return
          }
          res.status(200).json(category)     
      }catch(e){
        console.log(e)
      }       
    },

    /* SAVE category. */
    create:async function(req, res, next) {
        try{
          const category = new categoryModel({
            name:req.body.name
          })
          const response = await category.save()
          if(!response){
            res.status(200).json(errorMessage.GENERAL.saveError)
            return
          }
          res.json(response)
        }catch(e){
          next(e)
        }
    },
    /* UPDATE category. */
    update: async function(req, res, next) {
      try{
          if(!await categoryModel.findById(req.params.id)){
            res.status(200).json(errorMessage.GENERAL.updateError)
            return
          }
          const category = await categoryModel.updateOne({_id:req.params.id},req.body)
          res.status(200).json(category)
      }catch(e){
        res.json(e.message)
      }
  },
  /* DELETE product. */
  delete: async function(req, res, next) {
      try{
        if(!await categoryModel.findById(req.params.id)){
          res.status(200).json(errorMessage.GENERAL.deleteError)
          return
        }
        const category = await categoryModel.deleteOne({_id:req.params.id})
        res.status(200).json(category)
      }catch(e){
          console.log(e)
      }
  }
    
}