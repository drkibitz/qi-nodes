[![Build Status](https://travis-ci.org/drkibitz/qi-nodes.png?branch=master)](https://travis-ci.org/drkibitz/qi-nodes)
[![NPM version](https://badge.fury.io/js/qi-nodes.png)](http://badge.fury.io/js/qi-nodes)

# Qi Nodes

http://drkibitz.github.io/qi-nodes/

Base implementation for [composite patterns](http://en.wikipedia.org/wiki/Composite_pattern) in JavaScript.

## Usage

Any object with its property of "root" set, qualifies as a rooted node. The root property is simply propagated up and down the leaves.

The module itself is a rooted NodeObject.

```javascript
var nodes = require('qi-nodes');
console.log(nodes.root === nodes);
// > true
```

The previous fact doesn't limit you from having more rooted trees.

```javascript
var root = nodes.createRoot();
console.log(root.root === nodes);
// > false
```

There are many ways to work with the API, but they follow the same pattern.

```javascript
// pretty straight forward
n1 = root.append(nodes.create());
n2 = nodes.create().appendTo(root);

// The last argument is always the node context
n3 = nodes.append(nodes.create(), root);   // In this case it's the parent
n4 = nodes.appendTo(root, nodes.create()); // In this case it's the child

// Automatically append a newly created node by passing the parent to the create method.
n5 = nodes.create(root);
// Or to the NodeObject constructor
n6 = new nodes.NodeObject(root);

// > root -> n1, n2, n3, n4, n5, n6
```

Use instances of NodeObject to automatically use "this" as the node context. Which means the default value of the last optional argument in methods (With the exception of the create method), will be itself.

```javascript
var singleNode = nodes.create(); // new nodes.NodeObject();
n3 = singleNode.swap(n3);
// root -> n1, n2, singleNode, n4, n5, n6
```

The API works with generic objects. This is possible because members are simply property based. The only reason to use or extend the NodeObject constructor is if you like that flavor of API.

```javascript
var root2 = nodes.createRoot(),
	n2_1 = nodes.append({}, root2),
    n2_2 = nodes.append({}, n2_1),
    n2_3 = nodes.append({}, n2_2);
// root2 -> n2_1 -> n2_2 -> n2_3

n2_3 = nodes.swap(n2_3, n2_1);
// root2 -> n2_3 -> n2_2 -> n2_1
```

Swap nodes from one tree to another.

```javascript
var root3 = nodes.createRoot();
    n3_1 = nodes.create(root3),
    n3_2 = nodes.create(n3_2),
    n3_3 = nodes.create(n3_3);
// root3 -> n3_1 -> n3_2 -> n3_3

n2_2 = n3_2.swap(n2_2);
// root2 -> n2_3 -> n3_2 -> n2_1
// root3 -> n3_1 -> n2_2 -> n3_3
```
