var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res, next) {
  
  console.log(req.query)
  const products = [
    {
      id:1,
      name:"moto g",
      price:100
    },
    {
      id:2,
      name:"moto x",
      price:200
    },
    {
      id:3,
      name:"moto z",
      price:300
    }
  ]
  res.status(200).json(products)
});

module.exports = router;
