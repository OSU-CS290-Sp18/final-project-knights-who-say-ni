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
    var randList = [];
    for (var ingredient in ingredientList){
      var rand = Math.floor(Math.random()*3+1);
      var middle = ingredientList[ingredient];
      var myingredient = middle[rand];
      randList.push(myingredient);
    };
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
