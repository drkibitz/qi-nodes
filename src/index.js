/**
 * This module is an instance of {@link module:qi-nodes.NodeObject},
 * and it's own {@link module:qi-nodes.NodeObject#root}.
 * @module qi-nodes
 * @author Dr. Kibitz <info@drkibitz.com>
 */
'use strict';

/**
 * Having the same name as the DOM error defined by browser implementations,
 * this is a custom error thrown by methods of {@link module:qi-nodes.NodeObject}
 * within this module. It is thrown when any object is added to an invalid parent.
 * @constructor
 * @extends Error
 * @memberof module:qi-nodes
 */
function HierarchyRequestError(message) {
    this.message = (message || 'A NodeObject was inserted somewhere it doesn\'t belong.');
}
HierarchyRequestError.prototype = new Error();
HierarchyRequestError.prototype.name = 'HierarchyRequestError';

/** @ignore */
function cleanNode(n) {
    n.childCount = 0;
    n.firstChild = n.lastChild = n.nextSibling = n.parent = n.previousSibling = n.root = null;
}

/** @ignore */
function removeNode(child) {
    var parent, nextSibling, previousSibling;

    parent = child.parent;
    nextSibling = child.nextSibling;
    previousSibling = child.previousSibling;

    // allow possible TypeError here
    // also allow this to be NaN, childCount should be set at this point
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
function setRoot(node) {
    var oldRoot, newRoot;

    oldRoot = node.root;
    newRoot = node.parent ? node.parent.root : null;

    if (oldRoot && oldRoot.onNodeRemoved) {
        oldRoot.onNodeRemoved(node);
    }
    if (newRoot && newRoot.onNodeInserted) {
        newRoot.onNodeInserted(node);
    }
    node.root = newRoot;
}

/**
 * These objects, or types of them, are used in composite patterns.
 * Each instance of {@link module:qi-nodes.NodeObject} is aware of
 * it's own position within a tree of objects. If any tree has a root,
 * that root is propagated to all leaves of that tree.
 * When a leaf is removed from a rooted tree, the previous root
 * reference is removed for all objects contained in that leaf.
 * @constructor
 * @param {Object=} parent Optional parent object to append this object to
 * @memberof module:qi-nodes
 */
function NodeObject() {}

/**
 * Number of children in this object.
 * @name module:qi-nodes.NodeObject#childCount
 * @type {Object}
 */
/**
 * Reference to the first child object of this object.
 * Should never be falsey if this object has 1 or more children.
 * @name module:qi-nodes.NodeObject#firstChild
 * @type {Object}
 */
/**
 * Reference to the last child object of this object.
 * Should never be falsey if this object has 1 or more children.
 * @name module:qi-nodes.NodeObject#lastChild
 * @type {Object}
 */
/**
 * Reference to the next object relative to this object
 * within the list of child objects of its parent.
 * Should always be falsey if this object has no parent.
 * If this object has a parent and this value is falsey,
 * then this object is the last child of its parent.
 * @name module:qi-nodes.NodeObject#nextSibling
 * @type {Object}
 */
/**
 * Reference to this object's parent object.
 * Should never be falsey if this object is a child to another object.
 * @name module:qi-nodes.NodeObject#parent
 * @type {Object}
 */
/**
 * Reference to the previous object relative to this object
 * within the list of child objects of its parent.
 * If this object has a parent and this value is falsey,
 * then this object is the first child of its parent.
 * @name module:qi-nodes.NodeObject#previousSibling
 * @type {Object}
 */
/**
 * When an object is rooted, this property is a reference to itself.
 * This is a unique property that is propagated through the leaves
 * of an object tree, but only from an object with its root set
 * to a truthy value.
 * @name module:qi-nodes.NodeObject#root
 * @type {Object}
 */

/** @alias module:qi-nodes.NodeObject# */
var NodeObjectPrototype = NodeObject.prototype;

cleanNode(NodeObjectPrototype);

/**
 * Add the specified object as the {@link module:qi-nodes.NodeObject#lastChild} of the parent object.
 * **An object cannot be added to itself.**
 * @param {Object} node The object to add to this object
 * @param {Object=} parent The object to add the object to, **defaults to this object**
 * @return {Object} The object added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
NodeObjectPrototype.append = function append(node, parent) {
    // allow possible TypeError or HierarchyRequestError here
    return this.appendTo(parent || this, node);
};

/**
 * Add the object as the {@link module:qi-nodes.NodeObject#lastChild} of the specified parent object.
 * **An object cannot be added to itself.**
 * @param {Object} parent The object to add the object to
 * @param {Object=} node The object to add, **defaults to this object**
 * @return {Object} The object added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
NodeObjectPrototype.appendTo = function appendTo(parent, node) {
    var lastChild, count;

    // allow possible TypeError here
    lastChild = parent.lastChild;
    node = node || this; // optional

    if (node == parent) {
        throw new HierarchyRequestError();

    // may be a noop
    } else if (node != lastChild) {
        if (node.parent) {
            removeNode(node);
        }
        node.parent = parent;
        count = parent.childCount | 0;
        parent.childCount = count + 1;

        if (lastChild) {
            node.previousSibling = lastChild;
            lastChild.nextSibling = node;
        }
        parent.lastChild = node;
        if (!parent.firstChild) {
            parent.firstChild = node;
        }

        // maybe set root on all leaves
        if (node.root != parent.root) {
            this.eachChildFrom(setRoot, node);
        }
    }
    return node;
};

/**
 * Factory method that creates objects from this.constructor.prototype.
 * @param {Object=} parent Optional parent object to append this object to
 * @return {*} Instance of this.constructor.prototype optionally added to parent
 */
NodeObjectPrototype.create = function create(parent) {
    var node = new this.constructor();
    // cleanNode(node); // maybe
    if (parent) {
        node.appendTo(parent);
    }
    return node;
};

/**
 * Helper factory method that creates a new rooted object.
 * This means that it's root property is a reference to itself.
 * @return {module:qi-nodes.NodeObject} created rooted object
 */
NodeObjectPrototype.createRoot = function createRoot() {
    var node = this.create();
    node.root = node;
    return node;
};

/**
 * {@link module:qi-nodes.NodeObject#empty} the object's children,
 * and {@link module:qi-nodes.NodeObject#remove} it from its parent.
 * This essentially sets all properties to null that make this object a node.
 * @param {boolean=} recursive If true, will recursively empty all children, defaults to false
 * @param {Object=} node The object to destroy, **defaults to this object**
 * @return {Object} The object destroyed
 */
NodeObjectPrototype.destroy = function destroy(recursive, node) {
    node = node || this; // optional
    if (recursive) {
        // clears all properties from leaves to and including node
        this.eachChildTo(cleanNode, node);
    } else {
        node.root = null; // clear root
        if (node.parent) {
            removeNode(node);
        }
        if (node.firstChild) {
            this.empty(recursive, node);
        }
    }
    return node;
};

/**
 * Recursively iterate over each object **down** through all it's leaves.
 * @param {Function} fn The function to invoke for each object iterated
 * @param {Object=} node The starting object, **defaults to this object**
 * @param {Object=} thisObject Callback function context, **defaults to node**
 * @return {Object} The starting object
 */
NodeObjectPrototype.eachChildFrom = function eachChildFrom(fn, node, thisObject, _i) {
    var child, next;
    node = node || this; // optional
    thisObject = thisObject || node; // optional
    _i = _i | 0;
    child = node.firstChild;
    fn.call(thisObject, node, _i);
    while (child) {
        next = child.nextSibling;
        eachChildFrom(fn, child, thisObject, _i + 1);
        child = next;
    }
    return node;
};

/**
 * Recursively iterate over each object **up** through all it's leaves.
 * @param {Function} fn The function to invoke for each object iterated
 * @param {Object=} node The starting object, **defaults to this object**
 * @param {Object=} thisObject Callback function context, **defaults to node**
 * @return {Object} The starting object
 */
NodeObjectPrototype.eachChildTo = function eachChildTo(fn, node, thisObject, _i) {
    var child, prev;
    node = node || this; // optional
    thisObject = thisObject || node; // optional
    _i = _i | 0;
    child = node.lastChild;
    while (child) {
        prev = child.previousSibling;
        eachChildTo(fn, child, thisObject, _i + 1);
        child = prev;
    }
    fn.call(thisObject, node, _i);
    return node;
};

/**
 * Recursively iterate over each object **down** through all it's parents.
 * @param {Function} fn The function to invoke for each object iterated
 * @param {Object=} node The starting object, **defaults to this object**
 * @param {Object=} thisObject Callback function context, **defaults to node**
 * @return {Object} The starting object
 */
NodeObjectPrototype.eachParentTo = function eachParentTo(fn, node, thisObject, _i) {
    node = node || this; // optional
    thisObject = thisObject || node; // optional
    _i = _i | 0;
    if (node.parent) {
        eachParentTo(fn, node.parent, thisObject, _i + 1);
    }
    fn.call(thisObject, node, _i);
    return node;
};

/**
 * Recursively iterate over each object **up** through all it's parents.
 * @param {Function} fn The function to invoke for each object iterated
 * @param {Object=} node The starting object, **defaults to this object**
 * @param {Object=} thisObject Callback function context, **defaults to node**
 * @return {Object} The starting object
 */
NodeObjectPrototype.eachParentFrom = function eachParentFrom(fn, node, thisObject, _i) {
    node = node || this; // optional
    thisObject = thisObject || node; // optional
    _i = _i | 0;
    fn.call(thisObject, node, _i);
    if (node.parent) {
        eachParentFrom(fn, node.parent, thisObject, _i + 1);
    }
    return node;
};

/**
 * Remove all the object's children, but leaves its {@link module:qi-nodes.NodeObject#parent} intact.
 * @param {boolean=} recursive If true, will recursively empty all children, defaults to false
 * @param {Object=} node The object to empty, **defaults to this object**
 * @return {Object} The object emptied
 */
NodeObjectPrototype.empty = function empty(recursive, node) {
    var child, next;
    node = node || this; // optional
    child = node.firstChild;

    // The recersion of cleanNode does not touch these properties
    if (child && recursive) {
        node.childCount = 0;
        node.firstChild = node.lastChild = null;
    }
    // may be a noop
    while (child) {
        next = child.nextSibling;
        if (recursive) {
            // clears all properties from leaves to and including child
            this.eachChildTo(cleanNode, child);
        } else {
            // might change root on all leaves
            this.remove(child);
        }
        child = next;
    }
    return node;
};

/**
 * Add the object as the {@link module:qi-nodes.NodeObject#nextSibling} of the specified sibling object.
 * The sibling specified must be a child of a parent object.
 * **An object cannot be added to itself.**
 * @param {Object} sibling The object to insert the object after
 * @param {Object=} node The object to add, **defaults to this object**
 * @return {Object} The object added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
NodeObjectPrototype.insertAfter = function insertAfter(sibling, node) {
    var nextSibling, parent, count;

    // allow possible TypeError here
    nextSibling = sibling.nextSibling;
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
        count = parent.childCount | 0;
        parent.childCount = count + 1;

        // maybe set root on all leaves
        if (node.root != parent.root) {
            this.eachChildFrom(setRoot, node);
        }
    }
    return node;
};

/**
 * Add the object as the {@link module:qi-nodes.NodeObject#previousSibling} of the specified sibling object.
 * The sibling specified must be a child of a parent object.
 * **An object cannot be added to itself.**
 * @param {Object} sibling The object to insert the object before
 * @param {Object=} node The object to add, **defaults to this object**
 * @return {Object} The object added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
NodeObjectPrototype.insertBefore = function insertBefore(sibling, node) {
    var previousSibling, parent, count;

    // allow possible TypeError here
    previousSibling = sibling.previousSibling;
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
        count = parent.childCount | 0;
        parent.childCount = count + 1;

        // maybe set root on all leaves
        if (node.root != parent.root) {
            this.eachChildFrom(setRoot, node);
        }
    }
    return node;
};

/**
 * Add the specified object as the {@link module:qi-nodes.NodeObject#firstChild} of the parent object.
 * **An object cannot be added to itself.**
 * @param {Object} node The object to add to this object
 * @param {Object=} parent The object to add the object to, **defaults to this object**
 * @return {Object} The object added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
NodeObjectPrototype.prepend = function prepend(node, parent) {
    // allow possible TypeError or HierarchyRequestError here
    return this.prependTo(parent || this, node);
};

/**
 * Add the object as the {@link module:qi-nodes.NodeObject#firstChild} of the specified parent object.
 * **An object cannot be added to itself.**
 * @param {Object} parent The object to add the object to
 * @param {Object=} node The object to add, **defaults to this object**
 * @return {Object} The object added
 * @throws {module:qi-nodes.HierarchyRequestError}
 */
NodeObjectPrototype.prependTo = function prependTo(parent, node) {
    var firstChild, count;

    // allow possible TypeError here
    firstChild = parent.firstChild;
    node = node || this; // optional

    if (node == parent) {
        throw new HierarchyRequestError();

    // may be a noop
    } else if (node != firstChild) {
        if (node.parent) {
            removeNode(node);
        }
        node.parent = parent;
        count = parent.childCount | 0;
        parent.childCount = count + 1;

        if (firstChild) {
            node.nextSibling = firstChild;
            firstChild.previousSibling = node;
        }
        parent.firstChild = node;
        if (!parent.lastChild) {
            parent.lastChild = node;
        }

        // maybe set root on all leaves
        if (node.root != parent.root) {
            this.eachChildFrom(setRoot, node);
        }
    }
    return node;
};

/**
 * Remove the child object from its {@link module:qi-nodes.NodeObject#parent}, but leaves its children intact.
 * @param {Object=} child The object to remove, **defaults to this object**
 * @return {Object} The object removed
 */
NodeObjectPrototype.remove = function remove(child) {
    // allow possible TypeError
    child = removeNode(child || this); // optional
    // maybe set root on all leaves
    return child.root ? this.eachChildFrom(setRoot, child) : child;
};

/**
 * Swap one object's position with another object's.
 * @param {Object} node1 The object to swap with node2
 * @param {Object=} node2 The object to swap with node1, **defaults to this object**
 * @return {Object} node1 object
 */
NodeObjectPrototype.swap = function swap(node1, node2) {
    var next1, parent1, previous1,
        next2, parent2, previous2;

    // allow possible TypeError here
    next1 = node1.nextSibling;
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
        if (node1.root && !parent2 || node1.root != parent2.root) {
            this.eachChildFrom(setRoot, node1);
        }
        if (node2.root && !parent1 || node2.root != parent1.root) {
            this.eachChildFrom(setRoot, node2);
        }
    }
    return node1;
};

exports = module.exports = NodeObjectPrototype.createRoot();
exports.HierarchyRequestError = HierarchyRequestError;
exports.NodeObject = NodeObject;
