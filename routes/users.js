var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController")
/* GET users listing. */
router.get('/', usersController.getAll);

/* SAVE user. */
router.post('/', usersController.create);

/* LOGIN user. */
router.post('/login', usersController.login);

module.exports = router;
