var express = require('express');

module.exports = function (db) {
    var router = express.Router();

    router.post('/users/:id', function (req, res) {
        db.connect(function (err, client, done) {
            if (err) {
                done(err);
                res.status(500).send('Internal Server Error');
                return console.error('Error on getting a database connection from pool.', err);
            }

            client.query('SELECT "Id" as id FROM shortify."User" WHERE "Login" LIKE $1::text', [req.params.id], function (err, result) {
                if (err) {
                    done(err);
                    res.status(500).send('Internal Server Error');
                    return console.error('Error running query', err);
                }

                if (result.rowCount) {
                    done();
                    res.status(409).send('Conflict');
                    return;
                }

                client.query('INSERT INTO shortify."User" ("Login") VALUES ($1::text)', [req.params.id], function (err, result) {
                    if (err) {
                        done(err);
                        res.status(500).send('Internal Server Error');
                        return console.error('Error running query', err);
                    } else {
                        done();
                        res.status(201).json({ id: req.params.id }).send();
                        return;
                    }
                });
            });
        });
    });

    return router;
}