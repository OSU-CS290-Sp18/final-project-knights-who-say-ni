var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var ingredientList = require('./ingredientList');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.get('/home', function (req, res, next){
   res.status(200).render('home');
});

app.get('/generate', function (req, res, next){
    var rand1 = Math.floor(Math.random() * 3 + 1);
    var rand2 = Math.floor(Math.random() * 3 + 1);
    var rand3 = Math.floor(Math.random() * 3 + 1);
    var rand4 = Math.floor(Math.random() * 3 + 1);
    var rand5 = Math.floor(Math.random() * 3 + 1);
    var bun = ingredientList.bun[rand1];
    var drink = ingredientList.drink[rand2];
    var meat = ingredientList.meat[rand3];
    var side = ingredientList.side[rand4];
    var veggie = ingredientList.veggies[rand5];
    var randingredient = {
        bun:bun,
        drink:drink,
        meat:meat,
        side: side,
        veggie:veggie
    };
   
    res.status(200).render('generate', {
        ingredients: randingredient
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
