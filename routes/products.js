var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

/* GET products listing. */
router.get('/', productsController.getAll);

/* GET new products. */
router.get('/destacados', productsController.getNewProducts);

/* GET product by ID. */
router.get('/:id', productsController.getById);

/* SAVE product. */
/*Solicitamos que se tenga un Token valido para realizar la operacion*/
router.post('/',(req,res,next)=>{req.app.verifyToken(req,res,next)}, productsController.create);

/* UPDATE product. */
/*Solicitamos que se tenga un Token valido para realizar la operacion*/
router.put('/:id',(req,res,next)=>{req.app.verifyToken(req,res,next)}, productsController.update);

/* DELETE product. */
/*Solicitamos que se tenga un Token valido para realizar la operacion*/
router.delete('/:id',(req,res,next)=>{req.app.verifyToken(req,res,next)}, productsController.delete);

module.exports = router;
