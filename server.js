var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;

var ingredientList = require('./ingredientList');

var app = express();
var port = process.env.PORT || 17177;

var mongoHost = process.env.MONGO_HOST || 'classmongo.engr.oregonstate.edu';
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME || 'cs290_peterkyl';
var mongoPassword = process.env.MONGO_PASSWORD || 'cs290_peterkyl';
var mongoDBName = process.env.MONGO_DB_NAME || 'cs290_peterkyl';
var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
    "/" + mongoDBName;
var mongoDB = null;

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.get(['/home','/'], function (req, res, next){
   res.status(200).render('home');
});

app.get('/generate', function (req, res, next){
	 var ingredientCollection = mongoDB.collection('ingredients');
	 var ingredient;
	 ingredientCollection.find().toArray(function (err, ingredientArr){
		 if(err){
		 	console.log("error! using backup json");
		 	ingredient = ingredientList;
		 } else {
		   ingredient = ingredientArr[0];
		 };
 	  	 var rand1 = Math.floor(Math.random() * 3 + 1);
    	 var rand2 = Math.floor(Math.random() * 3 + 1);
	    var rand3 = Math.floor(Math.random() * 3 + 1);
   	 var rand4 = Math.floor(Math.random() * 3 + 1);
	    var rand5 = Math.floor(Math.random() * 3 + 1);
   	 var bun = ingredient.bun[rand1];
	    var drink = ingredient.drink[rand2];
	    var meat = ingredient.meat[rand3];
   	 var side = ingredient.side[rand4];
	    var veggie = ingredient.veggies[rand5];
	    var randingredient = {
        bun:bun,
        drink:drink,
        meat:meat,
        side: side,
        veggie:veggie
    	 };
   	 //console.log(randingredient);
    	 res.status(200).render('generate', {
       	ingredients: randingredient
    });
	});
 });

 app.get('/liability', function (req, res, next){
    res.status(200).render('liability');
 });

 app.get('/order', function (req, res, next){
    res.status(200).render('order');
 });

app.use('/images',express.static('images'));
app.use(express.static('public'));

app.get('*', function (req, res, next){
   res.status(400).render('404');
});

MongoClient.connect(mongoURL, function (err, client) {
	if (err) {
		throw err;
	}
	mongoDB = client.db(mongoDBName);
	app.listen(port, function () {
		console.log("== Server listening on port", port);
	});
})
