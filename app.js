require('./DB/local_db');
require('./vikings_wiki/telegram_conf');
var vk_weather_bot = require('./vk_weather_bot/vk_controller');
//var chatbot = require('./twichbot/twbot');
//server.start;

var express = require('express');
var app = express();
var path = require("path");
var engines = require('consolidate');
app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', engines.mustache);
app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(8080);

