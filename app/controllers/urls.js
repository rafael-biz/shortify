var express = require('express');
var router = express.Router();

router.get('/urls', function (req, res) {
    res.status(501).send('Not Implemented! Not yet.');
});

router.get('/urls/:id', function (req, res) {
    res.status(501).send('Not Implemented! Not yet.');
});

router.post('/users/:userid/urls', function (req, res) {
    res.status(501).send('Not Implemented! Not yet.');
});

router.delete('/urls/:id', function (req, res) {
    res.status(501).send('Not Implemented! Not yet.');
});

module.exports = router;