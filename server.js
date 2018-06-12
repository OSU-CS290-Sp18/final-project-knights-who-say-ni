var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var ingredientList = require('./ingredientList');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/home', function (req, res, next){
   res.status(200).render('home');
});

app.get('/generate', function (req, res, next){
    res.status(200).render('generate',{
        ingredients: ingredientList
    });
 });

 app.get('/liability', function (req, res, next){
    res.status(200).render('liability');
 });

 app.get('/order', function (req, res, next){
    res.status(200).render('order');
 });

app.get('*', function (req, res, next){
   res.status(400).render('404');
});

app.listen(port, function(){
   console.log("== Server is listenting on port",port);
});
