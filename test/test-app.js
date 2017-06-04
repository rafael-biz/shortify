var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app/app');

var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('URLs', function () {
    before(function (done) {
        chai.request(app)
            .post('/users/rafael')
            .end(function (err, res) {
                done();
            });
    });

    it('It should add a random url on HTTP POST /users/:userId/urls', function (done) {
        var host = Math.random().toString(36).replace(/[^a-z]+/g, '');
        var sufix = Math.random().toString(36).replace(/[^a-z]+/g, '');
        var url = 'http://' + host + '/' + sufix;
        chai.request(app)
            .post('/users/rafael/urls')
            .send({ url: url })
            .end(function (err, res) {
                res.should.have.status(201);
                expect(res.body).to.be.ok;
                expect(res.body.url).to.equal(url);
                expect(res.body.hits).to.equal(0);
                expect(res.body.id).to.be.ok;
                expect(res.body.shortUrl).to.be.ok;
                done();
            });
    });

    it('It should redirect to the url on GET /urls/:id', function (done) {
        var host = Math.random().toString(36).replace(/[^a-z]+/g, '');
        var sufix = Math.random().toString(36).replace(/[^a-z]+/g, '');
        var url = 'http://' + host + '/' + sufix;
        chai.request(app)
            .post('/users/rafael/urls')
            .send({ url: url })
            .end(function (err, res) {
                res.should.have.status(201);
                var shortUrl = res.body;
                chai.request(app)
                    .get('/urls/' + shortUrl.suffix)
                    .redirects(0)
                    .send()
                    .end(function (err, res) {
                        res.should.have.status(301);
                        expect(res).to.redirectTo(url);
                        done();
                    });
            });
    });
});

describe('Users', function () {
    it('It should add a single user with a random id on HTTP POST /users/:userId', function (done) {
        var name = Math.random().toString(36).replace(/[^a-z]+/g, '');
        chai.request(app)
            .post('/users/' + name)
            .end(function (err, res) {
                res.should.have.status(201);
                done();
            });
    });

    it('It should return HTTP 409 Conflict on POST /users/:userId', function (done) {
        var name = Math.random().toString(36).replace(/[^a-z]+/g, '');
        chai.request(app)
            .post('/users/' + name)
            .end(function (err, res) {
                res.should.have.status(201);
                chai.request(app)
                    .post('/users/' + name)
                    .end(function (err, res) {
                        res.should.have.status(409);
                        done();
                    });
            });
    });
});