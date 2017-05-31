//var gulp = require('gulp');
var express = require('express');
var app = express();

var controllers = {
	urls: require('./controllers/urls')
};

app.use('', controllers.urls);

app.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});

module.exports = app;