const express = require('express');
const config = require('../config');
const Base62 = require('base62');

module.exports = function (db) {
    var router = express.Router();

    router.get('/stats', function (req, res) {
        db.connect(function (err, client, done) {
            if (err) {
                done(err);
                res.status(500).send('Internal Server Error');
                return console.error('Error on getting a database connection from pool.', err);
            }

            client.query('SELECT COUNT(*) as urlCount, SUM("Hits") as hits FROM shortify."Url"', [], function (err, result) {
                if (err) {
                    done(err);
                    res.status(500).send('Internal Server Error');
                    return console.error('Error running query', err);
                }

                if (!result.rowCount) {
                    done();
                    res.status(500).send('Internal Server Error');
                    return console.error('No result found.');
                }

                var stats = result.rows[0];

                client.query('SELECT "Id" as id, "Hits" as hits, "Url" as url FROM shortify."Url" WHERE "Hits" > 0 ORDER BY "Hits" DESC LIMIT 10', [], function (err, result) {
                    if (err) {
                        done(err);
                        res.status(500).send('Internal Server Error');
                        return console.error('Error running query', err);
                    } else {
                        done();
                        stats.topUrls = result.rows;
                        for (var i in stats.topUrls) {
                            var item = stats.topUrls[i];
                            item.shortUrl = 'http://' + config.server.domain + '/urls/' + Base62.encode(item.id);
                        }

                        res.status(200).json(stats).send();
                        return;
                    }
                });
            });
        });
    });

    return router;
}