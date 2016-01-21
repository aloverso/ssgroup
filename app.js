var express = require('express');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handler = require('./routes/handler.js');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/robots');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

app.get('/mongoose', index.mongoose);

app.get("/handler", handler.handlerGET);
app.get("/makegroups", handler.makegroupsGET);
app.get("/getlist", handler.getlistGET);


app.listen(3000);