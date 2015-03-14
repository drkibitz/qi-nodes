var assert = require('assert');

var helper = {
    blankNode: {
        childCount: 0,
        firstChild: null,
        lastChild: null,
        nextSibling: null,
        parent: null,
        previousSibling: null,
        root: null
    }
};

helper.assertBlankNode = function assertBlankNode(node) {
    assert.strictEqual(Object.keys(helper.blankNode).some(function (key) {
        return node[key] !== helper.blankNode[key];
    }), false);
};

helper.assertStrictBlankNode = function assertStrictBlankNode(node) {
    assert.deepEqual(node, helper.blankNode);
};

module.exports = helper;
