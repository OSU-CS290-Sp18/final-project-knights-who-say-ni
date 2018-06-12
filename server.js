var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var ingredientList = require('./ingredientList');

var app = express();
var port = process.env.PORT || 3000;

//app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.get(['/home','/'], function (req, res, next){
   res.status(200).render('home');
});

app.get('/generate', function (req, res, next){
    //var rand1 = Math.floor(Math.random()*3+1);
    var bun = ingredientList["bun"];
    var mybun = bun[Math.floor(Math.random()*3+1)];
    var drink = ingredientList["drink"];
    var mydrink = drink[Math.floor(Math.random()*3+1)];
    var meat = ingredientList["meat"];
    var mymeat = meat[Math.floor(Math.random()*3+1)];
    var side = ingredientList["side"];
    var myside = side[Math.floor(Math.random()*3+1)];
    var veggies = ingredientList["veggies"];
    var myveggies = veggies[Math.floor(Math.random()*3+1)];

    var randList = [mybun, mydrink, mymeat, myside, myveggies];
    console.log(randList);
    res.status(200).render('generate',{
         ingredients: randList
    });
 });

 app.get('/liability', function (req, res, next){
    res.status(200).render('liability');
 });

 app.get('/order', function (req, res, next){
    res.status(200).render('order');
 });

app.use('/images', express.static('images'));
app.use(express.static('public'));

app.get('*', function (req, res, next){
   res.status(400).render('404');
});

app.listen(port, function(){
   console.log("== Server is listenting on port",port);
});
