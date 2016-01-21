var mongoose = require('mongoose');
var Student = require('./../models/studentModel.js');

var home = function(req, res){
  res.render("home", {"classes": [
  "Olin.js",
  "other class 1",
  "other class 2",
  "other class 3"]
});
};

var mongoose = function(req, res) {
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		var kittySchema = mongoose.Schema({
		    name: String
		});
		var Kitten = mongoose.model('Kitten', kittySchema);
		var silence = new Kitten({ name: 'Silence' });
		console.log(silence.name); // 'Silence'

		// NOTE: methods must be added to the schema before compiling it with mongoose.model()
		kittySchema.methods.speak = function () {
		  var greeting = this.name
		    ? "Meow name is " + this.name
		    : "I don't have a name";
		  console.log(greeting);
		}

		var Kitten = mongoose.model('Kitten', kittySchema);
		var fluffy = new Kitten({ name: 'fluffy' });
		fluffy.speak(); // "Meow name is fluffy"

		fluffy.save(function (err, fluffy) {
		  if (err) return console.error(err);
		  fluffy.speak();
		});

		Kitten.find(function (err, kittens) {
		  if (err) return console.error(err);
		  console.log(kittens);
		});

	});
	res.render('home');	
}

module.exports.home = home;
module.exports.mongoose = mongoose;