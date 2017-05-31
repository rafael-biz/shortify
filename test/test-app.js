var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app/app');

var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('URLs', function () {
    it('It should list ALL urls on HTTP GET /urls', function (done) {
        chai.request(app)
            .get('/urls')
            .end(function (err, res) {
                res.should.have.status(501);
                done();
            });
    });

    //it('should list a SINGLE url on /urls/<id> GET');
    //it('should add a SINGLE url on /urls POST');
    //it('should update a SINGLE url on /url/<id> PUT');
    //it('should delete a SINGLE url on /url/<id> DELETE');
});