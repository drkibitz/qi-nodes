/*global nodes*/
describe('HierarchyRequestError', function () {
    'use strict';

    var assert = require('assert'),
        HierarchyRequestError = nodes.HierarchyRequestError;

    it('has correct property values after creation.', function () {
        var err = new HierarchyRequestError();
        assert.strictEqual(err.name, 'HierarchyRequestError');
        assert.deepEqual(err, {
            message: 'A node was inserted somewhere it doesn\'t belong.'
        });
    });

    it('has correct message', function () {
        var err = new HierarchyRequestError('testing 123');
        assert.deepEqual(err, {
            message: 'testing 123'
        });
    });

    it('can be thrown', function () {
        assert.throws(function () {
            throw new HierarchyRequestError('test');
        }, HierarchyRequestError);
    });
});
