/*global nodes*/
describe('NodeObject extended', function () {
    'use strict';

    var assert = require('assert'),
        helper = require('../helper'),
        root,
        root2;

    function NodeObjectExtended() {}
    var NodeObjectExtendedPrototype = NodeObjectExtended.prototype = Object.create(nodes.NodeObject.prototype, {
        constructor: {value: NodeObjectExtended}
    });

    function setup() {
        root = NodeObjectExtendedPrototype.createRoot();
        root2 = NodeObjectExtendedPrototype.createRoot();
        assert.strictEqual(root instanceof NodeObjectExtended, true);
        assert.strictEqual(root2 instanceof NodeObjectExtended, true);
    }

    it('has correct property values after creation.', function () {
        var node = NodeObjectExtendedPrototype.create();
        helper.assertBlankNode(node);
        assert.strictEqual(node instanceof NodeObjectExtended, true);
    });

    describe('after append', function () {
        beforeEach(setup);

        it('1 level and 1 node works.', function () {
            var n1 = root.append({});

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, undefined);
            assert.strictEqual(n1.previousSibling, undefined);
        });

        it('3 levels and 1 node each works.', function () {
            var n1 = root.append(NodeObjectExtendedPrototype.create());
            var n2 = n1.append(NodeObjectExtendedPrototype.create());
            var n3 = n2.append(NodeObjectExtendedPrototype.create());

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.firstChild, n2);
            assert.strictEqual(n1.lastChild, n2);

            assert.strictEqual(n2.parent, n1);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.firstChild, n3);
            assert.strictEqual(n2.lastChild, n3);

            assert.strictEqual(n3.parent, n2);
            assert.strictEqual(n3.root, root);
        });

        it('1 level and 2 nodes work.', function () {
            var n1 = root.append({});
            var n2 = root.append({});

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, undefined);
            assert.strictEqual(n2.previousSibling, n1);
        });

        it('1 level and 3 nodes work.', function () {
            var n1 = root.append({});
            var n2 = root.append({});
            var n3 = root.append({});

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n3);
            assert.strictEqual(n2.previousSibling, n1);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, undefined);
            assert.strictEqual(n3.previousSibling, n2);
        });
    });

    describe('after appendTo', function () {
        beforeEach(setup);

        it('1 level and 1 node works.', function () {
            var n1 = NodeObjectExtendedPrototype.create().appendTo(root);

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);
        });
    });

    describe('after prepend', function () {
        beforeEach(setup);

        it('1 level and 1 node works.', function () {
            var n1 = root.prepend({});

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, undefined);
            assert.strictEqual(n1.previousSibling, undefined);
        });

        it('3 levels and 1 node each works.', function () {
            var n1 = root.prepend(NodeObjectExtendedPrototype.create());
            var n2 = n1.prepend(NodeObjectExtendedPrototype.create());
            var n3 = n2.prepend(NodeObjectExtendedPrototype.create());

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.firstChild, n2);
            assert.strictEqual(n1.lastChild, n2);

            assert.strictEqual(n2.parent, n1);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.firstChild, n3);
            assert.strictEqual(n2.lastChild, n3);

            assert.strictEqual(n3.parent, n2);
            assert.strictEqual(n3.root, root);
        });

        it('1 level and 2 nodes work.', function () {
            var n1 = root.prepend({});
            var n2 = root.prepend({});

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, undefined);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, undefined);
        });

        it('1 level and 3 nodes work.', function () {
            var n1 = root.prepend({});
            var n2 = root.prepend({});
            var n3 = root.prepend({});

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n3);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, undefined);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, n3);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, n2);
            assert.strictEqual(n3.previousSibling, undefined);
        });
    });

    describe('after prependTo', function () {
        beforeEach(setup);

        it('1 level and 1 node works.', function () {
            var n1 = NodeObjectExtendedPrototype.create().prependTo(root);

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);
        });
    });

    describe('after insertAfter', function () {
        beforeEach(setup);

        it('works with 1 previous child.', function () {
            var n1 = root.append({});
            var n2 = root.insertAfter(n1, {});

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, undefined);
            assert.strictEqual(n2.previousSibling, n1);
        });

        it('works with 2 previous children.', function () {
            var n1 = root.append({});
            var n2 = root.append({});
            var n3 = root.insertAfter(n1, {});

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n3);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, undefined);
            assert.strictEqual(n2.previousSibling, n3);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, n2);
            assert.strictEqual(n3.previousSibling, n1);
        });

        it('works with 3 previous children.', function () {
            var n1 = root.append({});
            var n2 = root.append({});
            var n3 = root.append({});
            var n4 = root.insertAfter(n2, {});

            assert.strictEqual(root.childCount, 4);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n4);
            assert.strictEqual(n2.previousSibling, n1);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, undefined);
            assert.strictEqual(n3.previousSibling, n4);

            assert.strictEqual(n4.parent, root);
            assert.strictEqual(n4.root, root);
            assert.strictEqual(n4.nextSibling, n3);
            assert.strictEqual(n4.previousSibling, n2);
        });

        it('moves tree.', function () {
            var n1 = root.append({});
            var n2 = root2.append({});

            NodeObjectExtendedPrototype.insertAfter(n1, n2);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(root2.childCount, 0);
            assert.strictEqual(root2.firstChild, undefined);
            assert.strictEqual(root2.lastChild, undefined);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, undefined);
            assert.strictEqual(n2.previousSibling, n1);
        });
    });

    describe('after insertBefore', function () {
        beforeEach(setup);

        it('with 1 argument.', function () {
            var n1 = root.append({});
            var n2 = NodeObjectExtendedPrototype.create().insertBefore(n1);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, undefined);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, undefined);
        });

        it('works with 1 previous child.', function () {
            var n1 = root.append({});
            var n2 = root.insertBefore(n1, {});

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, undefined);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, undefined);
        });

        it('works with 2 previous children.', function () {
            var n1 = root.append({});
            var n2 = root.append({});
            var n3 = root.insertBefore(n2, {});

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n3);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, undefined);
            assert.strictEqual(n2.previousSibling, n3);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, n2);
            assert.strictEqual(n3.previousSibling, n1);
        });

        it('works with 3 previous children.', function () {
            var n1 = root.append({});
            var n2 = root.append({});
            var n3 = root.append({});
            var n4 = root.insertBefore(n3, {});

            assert.strictEqual(root.childCount, 4);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, undefined);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n4);
            assert.strictEqual(n2.previousSibling, n1);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, undefined);
            assert.strictEqual(n3.previousSibling, n4);

            assert.strictEqual(n4.parent, root);
            assert.strictEqual(n4.root, root);
            assert.strictEqual(n4.nextSibling, n3);
            assert.strictEqual(n4.previousSibling, n2);
        });
    });

    describe('after empty', function () {
        beforeEach(setup);

        it('children are gone.', function () {
            var n1, n2;

            root.append({});
            n1 = root.append({});
            root.append({});
            root.append({});
            n2 = root.append({});
            root.append({});
            root.empty();

            assert.strictEqual(root.childCount, 0);
            assert.strictEqual(root.firstChild, undefined);
            assert.strictEqual(root.lastChild, undefined);

            assert.strictEqual(n1.parent, null);
            assert.strictEqual(n1.root, null);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, null);
            assert.strictEqual(n2.root, null);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, null);
        });

        it('children\'s children remain.', function () {
            /*jshint -W015*/
            var n1, n2, child, subchild1, subchild2;

            root.append({});
            n1 = root.append({});
            root.append({});
            root.append({});
            n2 = root.append({});
                child = nodes.create(n2);
                    subchild1 = child.append({});
                    subchild2 = child.append({});
            root.append({});

            root.empty();

            assert.strictEqual(root.childCount, 0);
            assert.strictEqual(root.firstChild, undefined);
            assert.strictEqual(root.lastChild, undefined);

            assert.strictEqual(n1.parent, null);
            assert.strictEqual(n1.root, null);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, null);
            assert.strictEqual(n2.root, null);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, null);
            assert.strictEqual(n2.childCount, 1);
            assert.strictEqual(n2.firstChild, child);
            assert.strictEqual(n2.lastChild, child);

            assert.strictEqual(child.parent, n2);
            assert.strictEqual(child.root, null);
            assert.strictEqual(child.nextSibling, null);
            assert.strictEqual(child.previousSibling, null);
            assert.strictEqual(child.childCount, 2);
            assert.strictEqual(child.firstChild, subchild1);
            assert.strictEqual(child.lastChild, subchild2);
        });
    });

    describe('after empty recursion', function () {
        beforeEach(setup);

        it('all children are blank.', function () {
            /*jshint -W015*/
            var n1, n2, child, subchild1, subchild2;

            root.append({});
            n1 = root.append({});
            root.append({});
            root.append({});
            n2 = root.append({});
                child = NodeObjectExtendedPrototype.create(n2);
                    subchild1 = child.append({});
                    subchild2 = child.append({});
            root.append({});

            root.empty(true);

            assert.strictEqual(root.childCount, 0);
            assert.strictEqual(root.firstChild, null);
            assert.strictEqual(root.lastChild, null);
            assert.strictEqual(root.root, root);

            helper.assertStrictBlankNode(n1);
            helper.assertStrictBlankNode(n2);
            helper.assertStrictBlankNode(child);
            helper.assertStrictBlankNode(subchild1);
            helper.assertStrictBlankNode(subchild2);
        });
    });

    describe('after destroy', function () {
        beforeEach(setup);

        it('child is blank.', function () {
            /*jshint -W015*/
            var n1, n2, n3, child, subchild, subchild2, subsubchild;

            n1 = root.append({});
            root.append({});
            root.append({});
            root.append({});
            n2 = root.append({});
                child = NodeObjectExtendedPrototype.create(n2);
                    subchild = child.append({});
                    subchild2 = NodeObjectExtendedPrototype.create(child);
                        subsubchild = subchild2.append({});
            n3 = root.append({});

            child.destroy();

            assert.strictEqual(root.childCount, 6);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);
            assert.strictEqual(root.root, root);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.childCount, 0);
            assert.strictEqual(n2.firstChild, null);
            assert.strictEqual(n2.lastChild, null);
            assert.strictEqual(n2.root, root);

            assert.deepEqual(child, {
                childCount: 0,
                root: null,
                previousSibling: null,
                parent: null,
                nextSibling: null,
                lastChild: undefined,
                firstChild: null
            });

            assert.strictEqual(subchild.nextSibling, null);
            assert.strictEqual(subchild.parent, null);
            assert.strictEqual(subchild.root, null);

            assert.strictEqual(subchild2.previousSibling, null);
            assert.strictEqual(subchild2.parent, null);
            assert.strictEqual(subchild2.childCount, 1);
            assert.strictEqual(subchild2.firstChild, subsubchild);
            assert.strictEqual(subchild2.lastChild, subsubchild);
            assert.strictEqual(subchild2.root, null);

            assert.strictEqual(subsubchild.parent, subchild2);
            assert.strictEqual(subsubchild.root, null);
        });
    });

    describe('after destroy recursion', function () {
        beforeEach(setup);

        it('all children are blank.', function () {
            /*jshint -W015*/
            var n1, n2, n3, child, subchild, subchild2, subsubchild;

            n1 = root.append({});
            root.append({});
            root.append({});
            root.append({});
            n2 = root.append({});
                child = NodeObjectExtendedPrototype.create(n2);
                    subchild = child.append({});
                    subchild2 = NodeObjectExtendedPrototype.create(child);
                        subsubchild = subchild2.append({});
            n3 = root.append({});

            root.destroy(true);

            helper.assertStrictBlankNode(root);
            helper.assertStrictBlankNode(n1);
            helper.assertStrictBlankNode(n2);
            helper.assertStrictBlankNode(n3);
            helper.assertStrictBlankNode(child);
            helper.assertStrictBlankNode(subchild);
            helper.assertStrictBlankNode(subchild2);
            helper.assertStrictBlankNode(subsubchild);
        });
    });
});
