var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;

var ingredientList = require('./ingredientList');

var app = express();
var port = process.env.PORT || 17171;

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
	var randList = [];
	var drinks = [];
	var sides = [];
	ingredientCollection.find().toArray(function (err, ingredientArr){
		if(err){
			console.log("error! using backup json");
			ingredient = ingredientList;
		};
		var ingredientDoc = ingredientArr[0];
		for (var ingredient in ingredientDoc){
			var rand = Math.floor(Math.random()*Math.floor(4));
	//		console.log("random number:", rand);
			var middle = ingredientDoc[ingredient];
			var myingredient = middle[rand];
			if(myingredient != null){
				if(myingredient.type === 'drink'){
					drinks.push(myingredient);
				} else if(myingredient.type === 'side'){
					sides.push(myingredient);
				} else {
					randList.push(myingredient);
				};
			};
		};
		//console.log(randList);
		res.status(200).render('generate', {
			drinks: drinks,
			ingredients: [randList[0],randList[2],randList[1],randList[0]],
			sides: sides
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
