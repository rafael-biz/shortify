//var gulp = require('gulp');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const config = require('./config');
const db = new pg.Pool(config.database);
const controllers = {
    urls: require('./controllers/urls'),
    users: require('./controllers/users'),
    stats: require('./controllers/stats')
};

db.on('error', function (err, client) {
    console.error('Database Error', err.message, err.stack);
});

app.use(bodyParser.json());
app.use('', controllers.urls(db));
app.use('', controllers.users(db));
app.use('', controllers.stats(db));

app.listen(config.server.port, function () {
    console.log(`Example app listening on port ${config.server.port}!`);
});

module.exports = app;