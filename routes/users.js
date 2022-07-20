var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  console.log(req.query)
  const users = [
    {
      id:1,
      name:"pepe",
      email: "pepe@gmail.com",
      password:"1234"
    },
    {
      id:2,
      name:"pepito",
      email: "pepito@gmail.com",
      password:"4321"
    },
    {
      id:3,
      name:"juan",
      email: "juan@gmail.com",
      password:"78945"
    }
  ]
  res.status(200).json(users)
});

/*GET user by ID*/
router.get('/:id', function(req, res, next) {
  console.log(req.params.id)
  const id = req.params.id;
  let user ={};
  const users = [
    {
      id:1,
      name:"pepe",
      email: "pepe@gmail.com",
      password:"1234"
    },
    {
      id:2,
      name:"pepito",
      email: "pepito@gmail.com",
      password:"4321"
    },
    {
      id:3,
      name:"juan",
      email: "juan@gmail.com",
      password:"78945"
    }
  ]

  users.forEach(element => {
    if(element.id == id){
      Object.assign(user, element);
      console.log ("userid", user);
    } 
  });

  res.status(200).json(user)
});

/*SAVE User*/
router.post('/save', function(req, res, next) {
  const users = [
    {
      id:1,
      name:"pepe",
      email: "pepe@gmail.com",
      password:"1234"
    },
    {
      id:2,
      name:"pepito",
      email: "pepito@gmail.com",
      password:"4321"
    },
    {
      id:3,
      name:"juan",
      email: "juan@gmail.com",
      password:"78945"
    }
  ]
  console.log(req.body);
  users.push(req.body);

  res.status(201).json(users);
});

/*LOGIN User*/
router.post('/login', function(req, res, next) {
  
  //console.log(req.body);

  res.status(200).json(req.body);
});

module.exports = router;
