var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require("jsonwebtoken")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories')

var app = express();
app.set("secretKey","key")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** Routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter)
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* Verificacion de Token */
function verifyToken(req,res,next){
  jwt.verify(req.headers["x-access-token"],req.app.get("secretKey"),function(err,decoded){ //decode devuelve la info asociada al token que pusimos en el controller ({userId:user._id,rol:"admin"})
    if(err){
      res.json({message:err.message})
    }else{
      next()
      
    }
  })
}
app.verifyToken = verifyToken

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message:err?.message})
  res.render('error');
});

module.exports = app;
