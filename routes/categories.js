var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categoriesController")

/* GET categories listing. */
router.get('/', categoriesController.getAll);

/* GET category by ID. */
router.get('/:id', categoriesController.getById);

/*SAVE category.*/
router.post('/', categoriesController.create);

/* UPDATE category. */
router.put('/:id', categoriesController.update);

/* DELETE category. */
router.delete('/:id', categoriesController.delete);

module.exports = router;
