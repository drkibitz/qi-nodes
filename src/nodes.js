/**
 * This module an instance of {@link module:qi-nodes.NodeObject},
 * and it's own {@link module:qi-nodes.NodeObject#root}.
 * @module qi-nodes
 * @author Dr. Kibitz <info@drkibitz.com>
 */
"use strict";

/**
 * Having the same name as the DOM error defined by browser implementations,
 * this is a custom error thrown by node methods within this module.
 * It is thrown when any node is added to an invalid parent.
 * @constructor
 * @extends Error
 * @memberof module:qi-nodes
 */
function HierarchyRequestError(message) {
    this.message = (message || "A NodeObject was inserted somewhere it doesn't belong.");
}
HierarchyRequestError.prototype = new Error();
HierarchyRequestError.prototype.name = "HierarchyRequestError";

/** @ignore */
function cleanNode(n) {
    n.childCount = 0;
    n.firstChild = n.lastChild = n.nextSibling = n.parent = n.previousSibling = n.root = null;
}

/** @ignore */
function removeNode(child) {
    var parent = child.parent,
        nextSibling = child.nextSibling,
        previousSibling = child.previousSibling;

    // allow possible TypeError here
    parent.childCount--;

    if (nextSibling) {
        nextSibling.previousSibling = previousSibling;
    } else {
        parent.lastChild = previousSibling;
    }

    if (previousSibling) {
        previousSibling.nextSibling = nextSibling;
    } else {
        parent.firstChild = nextSibling;
    }

    child.parent = child.nextSibling = child.previousSibling = null;
    return child;
}

/** @ignore */
function setRoot(node, i) {
    var oldRoot = node.root,
        newRoot = node.parent ? node.parent.root : null;
    if (oldRoot && node.onRemoved) node.onRemoved(oldRoot);
    if (newRoot && node.onInserted) node.onInserted(newRoot);
    node.root = newRoot;
}

/**
 * These objects, or types of them, are used in composite patterns.
 * Each instance of {@link module:qi-nodes.NodeObject} is aware of
 * it's own position within a tree of nodes. If any  tree has a root,
 * that root is propogated to all leaves of that tree.
 * When a leaf is removed from a rooted tree, the previous root
 * reference is removed for all nodes contained in that leaf.
 * @constructor
 * @return {module:qi-nodes.NodeObject=} parent Optional parent node to append this node to
 * @memberof module:qi-nodes
 */
function NodeObject(parent) {
    cleanNode(this);
    if (parent) parent.append(this);
}

/**
 * Number of children of this object.
 * @name module:qi-nodes.NodeObject#childCount
 * @type {module:qi-nodes.NodeObject}
 */
/**
 * Should never be null if this object has 1 or more children.
 * @name module:qi-nodes.NodeObject#firstChild
 * @type {module:qi-nodes.NodeObject}
 */
/**
 * Should never be null if this object has 1 or more children.
 * @name module:qi-nodes.NodeObject#lastChild
 * @type {module:qi-nodes.NodeObject}
 */
/**
 * Should always be null if this object has no parent.
 * If this object has a parent and this property value is null,
 * then this object is the last child.
 * @name module:qi-nodes.NodeObject#nextSibling
 * @type {module:qi-nodes.NodeObject}
 */
/**
 * Should never be null if this object is a child.
 * @name module:qi-nodes.NodeObject#parent
 * @type {module:qi-nodes.NodeObject}
 */
/**
 * Should always be null if this object has no parent.
 * If this object has a parent and this property value is null,
 * then this object is the first child.
 * @name module:qi-nodes.NodeObject#previousSibling
 * @type {module:qi-nodes.NodeObject}
 */
/**
 * This is a special property that is propogated through
 * the leaves of a tree, and only from a particular
 * {@link module:qi-nodes:NodeObject} with its root set.
 * This root property value is most likely a reference to itself.
 * @name module:qi-nodes.NodeObject#root
 * @type {module:qi-nodes.NodeObject}
 */

/** @alias module:qi-nodes.NodeObject# */
var proto = NodeObject.prototype;

/**
 * Add the node as the last child of this node.
 * @param {module:qi-nodes.NodeObject} node The node to add to this node
 * @return {module:qi-nodes.NodeObject} The node added
 */
proto.append = function append(node) {
    // allow possible TypeError or HierarchyRequestError
    return node.appendTo(this);
};

/**
 * Add this node as the last child of the specified parent node.
 * @param {module:qi-nodes.NodeObject} parent The node to add this node to
 * @return {module:qi-nodes.NodeObject} The node added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
proto.appendTo = function appendTo(parent) {
    // allow possible TypeError here
    var lastChild = parent.lastChild, node = this;

    if (node == parent) {
        throw new HierarchyRequestError();

    // may be a noop
    } else if (node != lastChild) {
        if (node.parent) removeNode(node);
        node.parent = parent;
        parent.childCount++;

        if (lastChild) {
            node.previousSibling = lastChild;
            lastChild.nextSibling = node;
        }
        parent.lastChild = node;
        if (!parent.firstChild) parent.firstChild = node;

        // maybe set root on all leaves
        if (node.root != parent.root) node.each(setRoot);
    }
    return node;
};

/**
 * Factory method.
 * @return {module:qi-nodes.NodeObject=} parent Optional parent node to append this node to
 * @return {module:qi-nodes.NodeObject} new NodeObject
 */
proto.create = function create(parent) {
    return new NodeObject(parent);
};

/**
 * Helper factory method that creates a new node with it's root property set to itself.
 * @return {module:qi-nodes.NodeObject} new rooted NodeObject
 */
proto.createRoot = function createRoot() {
    var root = new NodeObject();
    root.root = root;
    return root;
};

/**
 * Empty the node's children, and remove from its parent.
 * @param {boolean=} recursive If true, will recursively empty all children, defaults to false
 * @param {module:qi-nodes.NodeObject=} node The node to destroy, defaults to this node
 * @return {module:qi-nodes.NodeObject} The node destroyed
 */
proto.destroy = function destroy(recursive, node) {
    node = node || this;
    if (recursive) {
        // clears all properties from leaves to and including node
        node.eachReverse(cleanNode);
    } else {
        node.root = null; // clear root
        if (node.parent) removeNode(node);
        if (node.firstChild) node.empty();
    }
    NodeObject.call(this);
    return node;
};

/**
 * Recursively iterate over each node down through all it's leaves.
 * @param {Function} fn The function to invoke for each node iterated
 * @param {module:qi-nodes.NodeObject=} node The starting node, defaults to this node
 * @return {module:qi-nodes.NodeObject} The starting node
 */
proto.each = function each(fn, node, i) {
    var child, next;
    node = node || this;
    i = i | 0;
    child = node.firstChild;
    fn.call(node, node, i);
    while (child) {
        next = child.nextSibling;
        each(fn, child, i + 1);
        child = next;
    }
    return node;
};

/**
 * Recursively iterate over each node up through all it's parents.
 * @param {Function} fn The function to invoke for each node iterated
 * @param {module:qi-nodes.NodeObject=} node The starting node, defaults to this node
 * @return {module:qi-nodes.NodeObject} The starting node
 */
proto.eachParent = function eachParent(fn, node, i) {
    node = node || this;
    i = i | 0;
    if (node.parent) eachParent(fn, node.parent, i + 1);
    fn.call(node, node, i);
    return node;
};

/**
 * Recursively iterate over each node up through all it's leaves.
 * @param {Function} fn The function to invoke for each node iterated
 * @param {module:qi-nodes.NodeObject=} node The starting node, defaults to this node
 * @return {module:qi-nodes.NodeObject} The starting node
 */
proto.eachReverse = function eachReverse(fn, node, i) {
    var child, prev;
    node = node || this;
    i = i | 0;
    child = node.lastChild;
    while (child) {
        prev = child.previousSibling;
        eachReverse(fn, child, i + 1);
        child = prev;
    }
    fn.call(node, node, i);
    return node;
};

/**
 * Remove all the node's children.
 * @param {boolean=} recursive If true, will recursively empty all children, defaults to false
 * @param {module:qi-nodes.NodeObject=} node The node to empty, defaults to this node
 * @return {module:qi-nodes.NodeObject} The node emptied
 */
proto.empty = function empty(recursive, node) {
    var child, next;
    node = node || this;
    child = node.firstChild;

    if (recursive) {
        node.childCount = 0;
        node.firstChild = node.lastChild = null;
    }
    // may be a noop
    while (child) {
        next = child.nextSibling;
        if (recursive) {
            // clears all properties from leaves to and including child
            child.eachReverse(cleanNode);
        } else {
            // might change root on all leaves
            child.remove();
        }
        child = next;
    }
    return node;
};

/**
 * Add the node as the next sibling of the specified sibling node.
 * @param {module:qi-nodes.NodeObject} sibling The node to insert the node after
 * @param {module:qi-nodes.NodeObject=} node The node to add, defaults to this node
 * @return {module:qi-nodes.NodeObject} The node added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
proto.insertAfter = function insertAfter(sibling, node) {
    // allow possible TypeError here
    var nextSibling = sibling.nextSibling, parent;
    node = node || this; // optional

    // may be a noop
    if (node != sibling && node != nextSibling) {
        parent = sibling.parent;
        if (!parent || node == parent) {
            throw new HierarchyRequestError();
        } else if (node.parent) {
            removeNode(node);
        }

        node.previousSibling = sibling;
        node.nextSibling = nextSibling;
        node.parent = parent;

        if (nextSibling) {
            nextSibling.previousSibling = node;
        } else {
            parent.lastChild = node;
        }
        sibling.nextSibling = node;
        parent.childCount++;

        // maybe set root on all leaves
        if (node.root != parent.root) node.each(setRoot);
    }
    return node;
};

/**
 * Add the node as the previous sibling of the specified sibling node.
 * @param {module:qi-nodes.NodeObject} sibling The node to insert the node before
 * @param {module:qi-nodes.NodeObject=} node The node to add, defaults to this node
 * @return {module:qi-nodes.NodeObject} The node added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
proto.insertBefore = function insertBefore(sibling, node) {
    // allow possible TypeError here
    var previousSibling = sibling.previousSibling, parent;
    node = node || this; // optional

    // may be a noop
    if (node != sibling && node != previousSibling) {
        parent = sibling.parent;
        if (!parent || node == parent) {
            throw new HierarchyRequestError();
        } else if (node.parent) {
            removeNode(node);
        }

        node.previousSibling = previousSibling;
        node.nextSibling = sibling;
        node.parent = parent;

        if (previousSibling) {
            previousSibling.nextSibling = node;
        } else {
            parent.firstChild = node;
        }
        sibling.previousSibling = node;
        parent.childCount++;

        // maybe set root on all leaves
        if (node.root != parent.root) node.each(setRoot);
    }
    return node;
};

/**
 * Add the node as the first child of this node.
 * @param {module:qi-nodes.NodeObject} node The node to add to this node
 * @return {module:qi-nodes.NodeObject} The node added
 */
proto.prepend = function prepend(node) {
    // allow possible TypeError or HierarchyRequestError
    return node.prependTo(this);
};

/**
 * Add this node as the first child of the specified parent node.
 * @param {module:qi-nodes.NodeObject} parent The node to add this node to
 * @return {module:qi-nodes.NodeObject} The node added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
proto.prependTo = function prependTo(parent) {
    // allow possible TypeError here
    var firstChild = parent.firstChild, node = this;

    if (node == parent) {
        throw new HierarchyRequestError();

    // may be a noop
    } else if (node != firstChild) {
        if (node.parent) removeNode(node);
        node.parent = parent;
        parent.childCount++;

        if (firstChild) {
            node.nextSibling = firstChild;
            firstChild.previousSibling = node;
        }
        parent.firstChild = node;
        if (!parent.lastChild) parent.lastChild = node;

        // maybe set root on all leaves
        if (node.root != parent.root) node.each(setRoot);
    }
    return node;
};

/**
 * Remove the child node from its possible parent, but leaves its children intact.
 * @param {module:qi-nodes.NodeObject=} child The node to remove, defaults to this node
 * @return {module:qi-nodes.NodeObject} The node removed
 */
proto.remove = function remove(child) {
    // allow possible TypeError
    child = removeNode(child || this); // optional
    // maybe set root on all leaves
    return child.root ? child.each(setRoot) : child;
};

/**
 * Swap one node's position with another node's.
 * @param {module:qi-nodes.NodeObject} node1 The node to swap with node2
 * @param {module:qi-nodes.NodeObject=} node2 The node to swap with node1, defaults to this node
 * @return {module:qi-nodes.NodeObject} node1
 */
proto.swap = function swap(node1, node2) {
    // allow possible TypeError here
    var next1 = node1.nextSibling, parent1, previous1,
        next2, parent2, previous2;
    node2 = node2 || this; // optional

    // may be a noop
    if (node1 != node2) {
        parent1 = node1.parent;
        previous1 = node1.previousSibling;
        next2 = node2.nextSibling;
        parent2 = node2.parent;
        previous2 = node2.previousSibling;

        // node1
        node1.nextSibling = next2;
        node1.parent = parent2;
        node1.previousSibling = previous2;

        if (next2) {
            next2.previousSibling = node1;
        } else if (parent2) {
            parent2.lastChild = node1;
        }
        if (previous2) {
            previous2.nextSibling = node1;
        } else if (parent2) {
            parent2.firstChild = node1;
        }

        // node2
        node2.nextSibling = next1;
        node2.parent = parent1;
        node2.previousSibling = previous1;

        if (next1) {
            next1.previousSibling = node2;
        } else if (parent1) {
            parent1.lastChild = node2;
        }
        if (previous1) {
            previous1.nextSibling = node2;
        } else if (parent1) {
            parent1.firstChild = node2;
        }

        // maybe set root on all leaves
        if (node1.root && !parent2 || node1.root != parent2.root)
            node1.each(setRoot);
        if (node2.root && !parent1 || node2.root != parent1.root)
            node2.each(setRoot);
    }
    return node1;
};

exports = module.exports = proto.createRoot();
exports.HierarchyRequestError = HierarchyRequestError;
exports.NodeObject = NodeObject;