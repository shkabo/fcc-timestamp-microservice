var request = require('supertest');
//require = require('really-need');

describe('timestamp api test', function() {
    var server;
    beforeEach( function() {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
    });
    afterEach( function(done) {
        server.close(done);
    });
    
    it('responds to unix timestamp', function(done) {
        request(server)
            .get('/1450137600000')
            .expect({"unix":1450137600000,"natural":"December 15, 2015"}, done);
    });
    it('responds to natural time', function(done) {
        request(server)
            .get('/December 15, 2015')
            .expect({"unix":1450137600000,"natural":"December 15, 2015"}, done);
    });
    it('fail random string', function(done) {
        request(server)
            .get('/randomstring')
            .expect({"unix": null,"natural": null}, done);
    });
})
//https://github.com/visionmedia/supertest
//https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/