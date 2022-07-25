var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

/* GET products listing. */
router.get('/', productsController.getAll);

/* GET product by ID. */
router.get('/:id', productsController.getById);

/* SAVE product. */
router.post('/', productsController.create);

/* UPDATE product. */
router.put('/:id', productsController.update);

/* DELETE product. */
router.delete('/:id', productsController.delete);

module.exports = router;
