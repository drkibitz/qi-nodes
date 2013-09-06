"use strict";

var assert = require('assert');
var HierarchyRequestError = require('../nodes').HierarchyRequestError;

describe('HierarchyRequestError', function () {

    it("has correct property values after creation.", function () {
        var err = new HierarchyRequestError();
        assert.strictEqual(err.name, 'HierarchyRequestError');
        assert.deepEqual(err, {
            message: ''
        });
    });

    it("has correct message", function () {
        var err = new HierarchyRequestError('testing 123');
        assert.deepEqual(err, {
            message: 'testing 123'
        });
    });

    it("can be thrown", function () {
        assert.throws(function () {
            throw new HierarchyRequestError("test");
        }, HierarchyRequestError);
    });
});
