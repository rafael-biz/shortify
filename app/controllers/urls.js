const express = require('express');
const Base62 = require('base62');
const config = require('../config');

module.exports = function (db) {
    var router = express.Router();

    router.get('/urls/:id', function (req, res) {
        db.connect(function (err, client, done) {
            if (err) {
                done(err);
                res.status(500).send('Internal Server Error');
                return console.error('Error on getting a database connection from pool.', err);
            }

            var urlId = Base62.decode(req.params.id);
            client.query('SELECT "Id" as id, "UserId" as userId, "Url" as url FROM shortify."Url" WHERE "Id" = $1::int', [urlId], function (err, result) {
                if (err) {
                    done(err);
                    res.status(500).send('Internal Server Error');
                    return console.error('Error running query', err);
                }

                if (!result.rowCount) {
                    done();
                    res.status(404).send('URL Not Found');
                    return;
                }

                var row = result.rows[0];

                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.header('Expires', '-1');
                res.header('Pragma', 'no-cache');
                res.redirect(301, row.url);

                client.query('UPDATE shortify."Url" SET "Hits" = "Hits" + 1 WHERE "Id" = $1::int', [urlId], function (err, result) {
                    if (err) {
                        done(err);
                        return console.error('Error running query', err);
                    } else {
                        done();
                        return;
                    }
                });
            });
        });
    });

    router.post('/users/:userid/urls', function (req, res) {
        db.connect(function (err, client, done) {
            if (err) {
                done(err);
                res.status(500).send('Internal Server Error');
                return console.error('Error on getting a database connection from pool.', err);
            }

            client.query('SELECT "Id" as id FROM shortify."User" WHERE "Login" LIKE $1::text', [req.params.userid], function (err, result) {
                if (err) {
                    done(err);
                    res.status(500).send('Internal Server Error');
                    return console.error('Error running query', err);
                }

                if (!result.rowCount) {
                    done();
                    res.status(404).send('User Not Found');
                    return;
                }

                var userId = result.rows[0].id;

                client.query('INSERT INTO shortify."Url" ("UserId", "Url") VALUES ($1::int, $2::text) RETURNING "Id" as id', [userId, req.body.url], function (err, result) {
                    if (err) {
                        done(err);
                        res.status(500).send('Internal Server Error');
                        return console.error('Error running query', err);
                    } else {
                        done();
                        var urlId = result.rows[0].id;
                        var suffix = Base62.encode(urlId);
                        var shortUrl = 'http://' + config.server.domain + '/urls/' + suffix;
                        res.status(201).json({ id: urlId, hits: 0, url: req.body.url, shortUrl: shortUrl, suffix: suffix }).send();
                        return;
                    }
                });
            });
        });
    });

    router.delete('/urls/:id', function (req, res) {
        res.status(501).send('Not Implemented');
    });

    return router;
}