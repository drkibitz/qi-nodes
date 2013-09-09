describe('NodeObject', function () {
    "use strict";

    var assert = require('assert');
    var nodes = require('../');
    var NodeObject = nodes.NodeObject;
    var root, root2,
        blankNode = {
            childCount: 0,
            firstChild: null,
            lastChild: null,
            nextSibling: null,
            parent: null,
            previousSibling: null,
            root: null
        };

    function setup() {
        root = nodes.createRoot();
        root2 = nodes.createRoot();
    }

    it("has correct property values after creation.", function () {
        assert.deepEqual(nodes.create(), blankNode);
    });

    describe("after create", function () {
        beforeEach(setup);

        it("we have an instance.", function () {
            assert.deepEqual(root.create(), blankNode);
        });
    });

    describe("after append", function () {
        beforeEach(setup);

        it("1 level and 1 node works.", function () {
            var n1 = root.append(nodes.create());

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);
        });

        it("3 levels and 1 node each works.", function () {
            var n1 = root.append(nodes.create());
            var n2 = n1.append(nodes.create());
            var n3 = n2.append(nodes.create());

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

        it("1 level and 2 nodes work.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.append(nodes.create());

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, n1);
        });

        it("1 level and 3 nodes work.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.append(nodes.create());
            var n3 = root.append(nodes.create());

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n3);
            assert.strictEqual(n2.previousSibling, n1);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, null);
            assert.strictEqual(n3.previousSibling, n2);
        });

        it("moves tree.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root2.append(nodes.create());

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(root2.childCount, 1);
            assert.strictEqual(root2.firstChild, n2);
            assert.strictEqual(root2.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root2);
            assert.strictEqual(n2.root, root2);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, null);

            root.append(n2);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(root2.childCount, 0);
            assert.strictEqual(root2.firstChild, null);
            assert.strictEqual(root2.lastChild, null);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, n1);
        });
    });

    describe("after appendTo", function () {
        beforeEach(setup);

        it("1 level and 1 node works.", function () {
            var n1 = nodes.create().appendTo(root);

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);
        });
    });

    describe("after prepend", function () {
        beforeEach(setup);

        it("1 level and 1 node works.", function () {
            var n1 = root.prepend(nodes.create());

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);
        });

        it("3 levels and 1 node each works.", function () {
            var n1 = root.prepend(nodes.create());
            var n2 = n1.prepend(nodes.create());
            var n3 = n2.prepend(nodes.create());

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

        it("1 level and 2 nodes work.", function () {
            var n1 = root.prepend(nodes.create());
            var n2 = root.prepend(nodes.create());

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, null);
        });

        it("1 level and 3 nodes work.", function () {
            var n1 = root.prepend(nodes.create());
            var n2 = root.prepend(nodes.create());
            var n3 = root.prepend(nodes.create());

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n3);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, n3);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, n2);
            assert.strictEqual(n3.previousSibling, null);
        });

        it("moves tree.", function () {
            var n1 = root.prepend(nodes.create());
            var n2 = root2.prepend(nodes.create());

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(root2.childCount, 1);
            assert.strictEqual(root2.firstChild, n2);
            assert.strictEqual(root2.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root2);
            assert.strictEqual(n2.root, root2);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, null);

            root.prepend(n2);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(root2.childCount, 0);
            assert.strictEqual(root2.firstChild, null);
            assert.strictEqual(root2.lastChild, null);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, null);
        });
    });

    describe("after prependTo", function () {
        beforeEach(setup);

        it("1 level and 1 node works.", function () {
            var n1 = nodes.create().prependTo(root);

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);
        });
    });

    describe("after insertAfter", function () {
        beforeEach(setup);

        it("works with 1 previous child.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.insertAfter(n1, nodes.create());

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, n1);
        });

        it("works with 2 previous children.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.append(nodes.create());
            var n3 = root.insertAfter(n1, nodes.create());

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n3);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, n3);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, n2);
            assert.strictEqual(n3.previousSibling, n1);
        });

        it("works with 3 previous children.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.append(nodes.create());
            var n3 = root.append(nodes.create());
            var n4 = root.insertAfter(n2, nodes.create());

            assert.strictEqual(root.childCount, 4);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.nextSibling, n4);
            assert.strictEqual(n2.previousSibling, n1);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, null);
            assert.strictEqual(n3.previousSibling, n4);

            assert.strictEqual(n4.parent, root);
            assert.strictEqual(n4.root, root);
            assert.strictEqual(n4.nextSibling, n3);
            assert.strictEqual(n4.previousSibling, n2);
        });

        it("moves tree.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root2.append(nodes.create());

            n2.insertAfter(n1);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(root2.childCount, 0);
            assert.strictEqual(root2.firstChild, null);
            assert.strictEqual(root2.lastChild, null);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, n1);
        });
    });

    describe("after insertBefore", function () {
        beforeEach(setup);

        it("with 1 argument.", function () {
            var n1 = root.append(nodes.create());
            var n2 = nodes.create().insertBefore(n1);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, null);
        });

        it("works with 1 previous child.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.insertBefore(n1, nodes.create());

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, null);
        });

        it("works with 2 previous children.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.append(nodes.create());
            var n3 = root.insertBefore(n2, nodes.create());

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n3);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, n3);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, n2);
            assert.strictEqual(n3.previousSibling, n1);
        });

        it("works with 3 previous children.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root.append(nodes.create());
            var n3 = root.append(nodes.create());
            var n4 = root.insertBefore(n3, nodes.create());

            assert.strictEqual(root.childCount, 4);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, n2);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n4);
            assert.strictEqual(n2.previousSibling, n1);

            assert.strictEqual(n3.parent, root);
            assert.strictEqual(n3.root, root);
            assert.strictEqual(n3.nextSibling, null);
            assert.strictEqual(n3.previousSibling, n4);

            assert.strictEqual(n4.parent, root);
            assert.strictEqual(n4.root, root);
            assert.strictEqual(n4.nextSibling, n3);
            assert.strictEqual(n4.previousSibling, n2);
        });

        it("moves tree.", function () {
            var n1 = root.append(nodes.create());
            var n2 = root2.append(nodes.create());

            n2.insertBefore(n1);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(root2.childCount, 0);
            assert.strictEqual(root2.firstChild, null);
            assert.strictEqual(root2.lastChild, null);

            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, n2);

            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
            assert.strictEqual(n2.nextSibling, n1);
            assert.strictEqual(n2.previousSibling, null);
        });
    });

    describe("after empty", function () {
        beforeEach(setup);

        it("children are gone.", function () {
            var n1, n2;

            nodes.create(root);
            n1 = nodes.create(root);
            nodes.create(root);
            nodes.create(root);
            n2 = nodes.create(root);
            nodes.create(root);
            root.empty();

            assert.strictEqual(root.childCount, 0);
            assert.strictEqual(root.firstChild, null);
            assert.strictEqual(root.lastChild, null);

            assert.strictEqual(n1.parent, null);
            assert.strictEqual(n1.root, null);
            assert.strictEqual(n1.nextSibling, null);
            assert.strictEqual(n1.previousSibling, null);

            assert.strictEqual(n2.parent, null);
            assert.strictEqual(n2.root, null);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n2.previousSibling, null);
        });

        it("children's children remain.", function () {
            var n1, n2, child, subchild1, subchild2;

            nodes.create(root);
            n1 = nodes.create(root);
            nodes.create(root);
            nodes.create(root);
            n2 = nodes.create(root);
                child = nodes.create(n2);
                    subchild1 = nodes.create(child);
                    subchild2 = nodes.create(child);
            nodes.create(root);

            root.empty();

            assert.strictEqual(root.childCount, 0);
            assert.strictEqual(root.firstChild, null);
            assert.strictEqual(root.lastChild, null);

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

    describe("after empty recursion", function () {
        beforeEach(setup);

        it("all children are blank.", function () {
            var n1, n2, child, subchild1, subchild2;

            nodes.create(root);
            n1 = nodes.create(root);
            nodes.create(root);
            nodes.create(root);
            n2 = nodes.create(root);
                child = nodes.create(n2);
                    subchild1 = nodes.create(child);
                    subchild2 = nodes.create(child);
            nodes.create(root);

            root.empty(true);

            assert.strictEqual(root.childCount, 0);
            assert.strictEqual(root.firstChild, null);
            assert.strictEqual(root.lastChild, null);
            assert.strictEqual(root.root, root);

            assert.deepEqual(n1, blankNode);
            assert.deepEqual(n2, blankNode);
            assert.deepEqual(child, blankNode);
            assert.deepEqual(subchild1, blankNode);
            assert.deepEqual(subchild2, blankNode);
        });
    });

    describe("each and eachReverse", function () {

        it("single node works.", function () {
            var arr = [], arrReverse = [];
            nodes.create().each(function (n, i) { arr.push(i); });
            nodes.create().eachReverse(function (n, i) { arrReverse.push(i); });
            assert.deepEqual(arr, [0]);
            assert.deepEqual(arrReverse, arr.reverse());
        });

        it("single tree works.", function () {
            var arr = [], arrReverse = [], n1 = nodes.create();
            n1.append(nodes.create())
                .append(nodes.create())
                    .append(nodes.create())
                        .append(nodes.create())
                            .append(nodes.create())
                                .append(nodes.create())
                                    .append(nodes.create());

            n1.each(function (n, i) { arr.push(i); });
            n1.eachReverse(function (n, i) { arrReverse.push(i); });
            assert.deepEqual(arr, [0,1,2,3,4,5,6,7]);
            assert.deepEqual(arrReverse, arr.reverse());
        });

        it("multiple trees work.", function () {
            var arr = [], arr2 = [], arr3 = [],
                arrReverse = [], arrReverse2 = [], arrReverse3 = [],
                n1 = nodes.create(),
                n2 = nodes.create();

            // tree 1
            n1.append(nodes.create())
                .append(nodes.create())
                    .append(nodes.create())
                        .append(nodes.create())
                            .append(nodes.create())
                                .append(nodes.create())
                                    .append(nodes.create());
            n1.each(function (n, i) { arr.push(i); });
            n1.eachReverse(function (n, i) { arrReverse.push(i); });

            // tree 2
            n2 = nodes.create();
            n2.append(nodes.create());
            n2.append(nodes.create())
                .append(nodes.create())
                    .append(nodes.create())
                        .append(nodes.create())
                            .append(nodes.create())
                                .append(nodes.create())
                                    .append(nodes.create());
            n2.append(nodes.create())
                .append(nodes.create())
                .parent.append(nodes.create())
                .parent.append(nodes.create())
                    .append(nodes.create())
                    .parent.append(nodes.create())
                .parent.parent.append(nodes.create())
                    .append(nodes.create())
                    .parent.append(nodes.create())
                        .append(nodes.create())
                        .parent.append(nodes.create())
            n2.each(function (n, i) { arr2.push(i); });
            n2.eachReverse(function (n, i) { arrReverse2.push(i); });

            // combined
            n1.append(n2);
            n1.each(function (n, i) { arr3.push(i); });
            n1.eachReverse(function (n, i) { arrReverse3.push(i); });

            assert.deepEqual(arr,         [0,1,2,3,4,5,6,7]);
            assert.deepEqual(arrReverse,  arr.reverse());
            assert.deepEqual(arr2,        [0,1,1,2,3,4,5,6,7,1,2,2,2,3,3,2,3,3,4,4]);
            assert.deepEqual(arrReverse2, arr2.reverse());
            assert.deepEqual(arr3,        [0,1,2,3,4,5,6,7,1,2,2,3,4,5,6,7,8,2,3,3,3,4,4,3,4,4,5,5]);
            assert.deepEqual(arrReverse3, arr3.reverse());
        });
    });

    describe("eachParent", function () {

        it("single node works.", function () {
            var arr = [], n1 = nodes.create();
            n1.eachParent(function (n, i) {
                arr.push(i);
            });
            assert.deepEqual(arr, [0]);
        });

        it("single tree works.", function () {
            var arr = [], n1 = nodes.create(), child = nodes.create();
            root.append(nodes.create())
                .append(nodes.create())
                    .append(nodes.create())
                        .append(nodes.create())
                            .append(nodes.create())
                                .append(nodes.create())
                                    .append(child);
            child.eachParent(function (n, i) {
                arr.push(i);
            });
            assert.deepEqual(arr, [7,6,5,4,3,2,1,0]);
        });

        it("multiple trees work.", function () {
            var arr = [], arr2 = [], arr3 = [],
                n1 = nodes.create(),
                child = nodes.create(),
                n2 = nodes.create(),
                child2 = nodes.create();

            // tree 1
            n1.append(nodes.create())
                .append(nodes.create())
                    .append(nodes.create())
                        .append(nodes.create())
                            .append(nodes.create())
                                .append(nodes.create())
                                    .append(child);
            child.eachParent(function (n, i) {
                arr.push(i);
            });

            // tree 2
            n2.append(nodes.create())
                .append(nodes.create())
                    .append(nodes.create())
                        .append(nodes.create())
                            .append(nodes.create())
                                .append(nodes.create())
                                    .append(child2);
            child2.eachParent(function (n, i) {
                arr2.push(i);
            });

            // combined
            child.append(n2);
            child2.eachParent(function (n, i) { arr3.push(i); });

            assert.deepEqual(arr, [7,6,5,4,3,2,1,0]);
            assert.deepEqual(arr2, [7,6,5,4,3,2,1,0]);
            assert.deepEqual(arr3, [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]);
        });
    });

    describe("after destroy recursion", function () {
        beforeEach(setup);

        it("child is blank.", function () {
            var n1, n2, n3, child, subchild, subchild2, subsubchild;

            n1 = nodes.create(root);
            nodes.create(root);
            nodes.create(root);
            nodes.create(root);
            n2 = nodes.create(root);
                child = nodes.create(n2);
                    subchild = nodes.create(child);
                    subchild2 = nodes.create(child);
                        subsubchild = nodes.create(subchild2);
            n3 = nodes.create(root);

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

            assert.deepEqual(child, blankNode);

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

    describe("after destroy recursion", function () {
        beforeEach(setup);

        it("all children are blank.", function () {
            var n1, n2, n3, child, subchild, subchild2, subsubchild;

            n1 = nodes.create(root);
            nodes.create(root);
            nodes.create(root);
            nodes.create(root);
            n2 = nodes.create(root);
                child = nodes.create(n2);
                    subchild = nodes.create(child);
                    subchild2 = nodes.create(child);
                        subsubchild = nodes.create(subchild2);
            n3 = nodes.create(root);

            root.destroy(true);

            assert.deepEqual(root, blankNode);
            assert.deepEqual(n1, blankNode);
            assert.deepEqual(n2, blankNode);
            assert.deepEqual(n3, blankNode);
            assert.deepEqual(child, blankNode);
            assert.deepEqual(subchild, blankNode);
            assert.deepEqual(subchild2, blankNode);
            assert.deepEqual(subsubchild, blankNode);
        });
    });

    describe("after swap", function () {
        beforeEach(setup);

        it("with first child.", function () {
            var first = nodes.create(root);
            var last = nodes.create(root);
            var n1 = nodes.create();
            n1.swap(first);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, last);

            assert.strictEqual(first.parent, null);
            assert.strictEqual(first.root, null);
            assert.strictEqual(first.nextSibling, null);
            assert.strictEqual(last.previousSibling, n1);
            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.nextSibling, last);
        });

        it("with last child.", function () {
            var first = nodes.create(root);
            var last = nodes.create(root);
            var n1 = nodes.create();
            n1.swap(last);

            assert.strictEqual(root.childCount, 2);
            assert.strictEqual(root.firstChild, first);
            assert.strictEqual(root.lastChild, n1);

            assert.strictEqual(first.nextSibling, n1);
            assert.strictEqual(last.parent, null);
            assert.strictEqual(last.root, null);
            assert.strictEqual(last.nextSibling, null);
            assert.strictEqual(n1.parent, root);
            assert.strictEqual(n1.root, root);
            assert.strictEqual(n1.previousSibling, first);
        });

        it("between two siblings.", function () {
            var n1 = nodes.create(root);
            var n2 = nodes.create(root);
            var n3 = nodes.create(root);
            var nOut = nodes.create();
            nOut.swap(n2);

            assert.strictEqual(root.childCount, 3);
            assert.strictEqual(root.firstChild, n1);
            assert.strictEqual(root.lastChild, n3);

            assert.strictEqual(n1.nextSibling, nOut);
            assert.strictEqual(n2.previousSibling, null);
            assert.strictEqual(n2.nextSibling, null);
            assert.strictEqual(n3.previousSibling, nOut);
            assert.strictEqual(nOut.previousSibling, n1);
            assert.strictEqual(nOut.nextSibling, n3);
        });

        it("node in and node out of tree.", function () {
            var nIn = nodes.create(root);
            var nOut = nodes.create();
            nOut.swap(nIn);

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, nOut);
            assert.strictEqual(root.lastChild, nOut);

            assert.strictEqual(nIn.parent, null);
            assert.strictEqual(nIn.root, null);
            assert.strictEqual(nOut.parent, root);
            assert.strictEqual(nOut.root, root);
        });

        it("from tree to tree.", function () {
            var n1 = nodes.create(root);
            var n2 = nodes.create(root2);
            n2.swap(n1);

            assert.strictEqual(root.childCount, 1);
            assert.strictEqual(root.firstChild, n2);
            assert.strictEqual(root.lastChild, n2);

            assert.strictEqual(root2.childCount, 1);
            assert.strictEqual(root2.firstChild, n1);
            assert.strictEqual(root2.lastChild, n1);

            assert.strictEqual(n1.parent, root2);
            assert.strictEqual(n1.root, root2);
            assert.strictEqual(n2.parent, root);
            assert.strictEqual(n2.root, root);
        });
    });

    describe('throws TypeError when', function() {
        beforeEach(setup);

        it("append nothing.", function () {
            assert.throws(function () { root.append(); }, TypeError);
        });

        it("appendTo nothing.", function () {
            assert.throws(function () { root.appendTo(); }, TypeError);
        });

        it("each nothing.", function () {
            assert.throws(function () { root.each(); }, TypeError);
        });

        it("eachParent nothing.", function () {
            assert.throws(function () { root.eachParent(); }, TypeError);
        });

        it("eachReverse nothing.", function () {
            assert.throws(function () { root.eachReverse(); }, TypeError);
        });

        it("insertAfter nothing.", function () {
            assert.throws(function () { root.insertAfter(); }, TypeError);
        });

        it("insertBefore nothing.", function () {
            assert.throws(function () { root.insertBefore(); }, TypeError);
        });

        it("prepend nothing.", function () {
            assert.throws(function () { root.prepend(); }, TypeError);
        });

        it("prependTo nothing.", function () {
            assert.throws(function () { root.prependTo(); }, TypeError);
        });

        it("remove without parent.", function () {
            assert.throws(function () { nodes.create().remove(); }, TypeError);
        });

        it("swap nothing.", function () {
            assert.throws(function () { root.swap(); }, TypeError);
        });
    });

    describe('throws nodes.HierarchyRequestError when', function() {
        beforeEach(setup);

        it("append self.", function () {
            assert.throws(function () { root.append(root); }, nodes.HierarchyRequestError);
        });

        it("appendTo self.", function () {
            assert.throws(function () { root.appendTo(root); }, nodes.HierarchyRequestError);
        });

        it("prepend self.", function () {
            assert.throws(function () { root.prepend(root); }, nodes.HierarchyRequestError);
        });

        it("prependTo self.", function () {
            assert.throws(function () { root.prependTo(root); }, nodes.HierarchyRequestError);
        });

        it("insertAfter no sibling.parent.", function () {
            assert.throws(function () { nodes.create().insertAfter(nodes.create()); }, nodes.HierarchyRequestError);
        });

        it("insertAfter sibling.parent is self.", function () {
            assert.throws(function () { root.insertAfter(root.append(nodes.create()), root); }, nodes.HierarchyRequestError);
        });

        it("insertBefore no sibling.parent.", function () {
            assert.throws(function () { nodes.create().insertBefore(nodes.create()); }, nodes.HierarchyRequestError);
        });

        it("insertBefore sibling.parent is self.", function () {
            assert.throws(function () { root.insertBefore(root.append(nodes.create()), root); }, nodes.HierarchyRequestError);
        });
    });

    describe("methods are chainable", function () {
        var n1, n2, n3, n4;

        beforeEach(function () {
            n1 = nodes.create();
            n2 = nodes.create();
            n3 = nodes.create();
            n4 = nodes.create();
        });

        it("append.", function () {
            assert.strictEqual(n2, n1.append(n2));
        });
        it("appendTo.", function () {
            assert.strictEqual(n2, n2.appendTo(n1));
        });
        it("destroy.", function () {
            assert.strictEqual(n1, n1.destroy());
            assert.strictEqual(n2, n2.destroy(false, n2));
        });
        it("each.", function () {
            assert.strictEqual(n1, n1.each(function () {}));
            assert.strictEqual(n2, n1.each(function () {}, n2));
        });
        it("eachParent.", function () {
            assert.strictEqual(n1, n1.eachParent(function () {}));
            assert.strictEqual(n2, n1.eachParent(function () {}, n2));
        });
        it("eachReverse.", function () {
            assert.strictEqual(n1, n1.eachReverse(function () {}));
            assert.strictEqual(n2, n1.eachReverse(function () {}, n2));
        });
        it("empty.", function () {
            assert.strictEqual(n1, n1.empty());
            assert.strictEqual(n2, n1.empty(false, n2));
        });
        it("insertAfter.", function () {
            n1.append(n2);
            assert.strictEqual(n3, n3.insertAfter(n2));
            assert.strictEqual(n4, n3.insertAfter(n3, n4));
        });
        it("insertBefore.", function () {
            n1.append(n2);
            assert.strictEqual(n3, n3.insertBefore(n2));
            assert.strictEqual(n4, n1.insertBefore(n3, n4));
        });
        it("prepend.", function () {
            assert.strictEqual(n2, n1.prepend(n2));
        });
        it("prependTo.", function () {
            assert.strictEqual(n2, n2.prependTo(n1));
        });
        it("remove.", function () {
            n1.append(n2);
            n1.append(n3);
            assert.strictEqual(n2, n2.remove());
            assert.strictEqual(n3, n1.remove(n3));
        });
        it("swap.", function () {
            n1.append(n2);
            n1.append(n3);
            assert.strictEqual(n3, n2.swap(n3));
            assert.strictEqual(n2, n3.swap(n2));
        });
    });
});
