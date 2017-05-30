//var gulp = require('gulp');
var express = require('express');
var app = express();

app.get('/urls', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ a: 1, b: 'test' }, null, 4));
});

app.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});