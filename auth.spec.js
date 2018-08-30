const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

const auth = require('./auth');

describe("The auth function", () => {
    it("returns true", () => {
        it('should tru when the value \'E53E6B35EC8FC218315FB68574E76\' is passed', function() {
            assert.true(auth.checkAuth('E53E6B35EC8FC218315FB68574E76'))
          });

    });
});