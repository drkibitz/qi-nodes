"use strict";

var assert = require('assert');
var nodes = require('../nodes');

describe('nodes', function () {
    it("has NodeObject member.", function () {
        assert.strictEqual(typeof nodes.NodeObject, 'function');
    });

    it("is a NodeObject.", function () {
        assert.strictEqual(nodes instanceof nodes.NodeObject, true);
    });

    it("is its own root.", function () {
        assert.strictEqual(nodes.root, nodes);
    });

    it("can create a node.", function () {
        var n1 = nodes.create();
        assert.strictEqual(n1 instanceof nodes.NodeObject, true);
    });

    it("adding a child works.", function () {
        var n1 = nodes.append(nodes.create());
        assert.strictEqual(n1 instanceof nodes.NodeObject, true);
        assert.strictEqual(nodes.childCount, 1);
        assert.strictEqual(nodes.firstChild, n1);
        assert.strictEqual(nodes.lastChild, n1);
        assert.strictEqual(n1.parent, nodes);
        assert.strictEqual(n1.root, nodes);
    });
});
