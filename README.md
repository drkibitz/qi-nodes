[![Build Status](https://travis-ci.org/drkibitz/qi-nodes.svg?branch=master)](https://travis-ci.org/drkibitz/qi-nodes?branch=master)
[![Coverage Status](https://coveralls.io/repos/drkibitz/qi-nodes/badge.svg?branch=master)](https://coveralls.io/r/drkibitz/qi-nodes?branch=master)
[![npm version](https://badge.fury.io/js/qi-nodes.svg)](http://badge.fury.io/js/qi-nodes)
[![devDependency Status](https://david-dm.org/drkibitz/qi-nodes/dev-status.svg)](https://david-dm.org/drkibitz/qi-nodes#info=devDependencies)

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

// > root -> n1, n2, n3, n4, n5, n6
```

Use instances of NodeObject to automatically use "this" as the node context. Which means the default value of the last optional argument in methods (With the exception of the create method), will be itself.

```javascript
var singleNode = nodes.create();
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

Create a class that extends NodeObject as normal.

```javascript
function MyNodeExtended() {}
MyNodeExtended.prototype = Object.create(nodes.NodeObject.prototype, {
	constructor: {value: MyNodeExtended}
});

var root = MyNodeExtended.prototype.createRoot();
var node = root.create(root);

console.log(root instanceof MyNodeExtended); // true
console.log(node instanceof MyNodeExtended); // true
```

Assign (mixin) the NodeObject prototype.

```javascript
function MyNodeAssigned() {}
Object.assign(MyNodeAssigned.prototype, nodes.NodeObject.prototype);

var root = MyNodeAssigned.prototype.createRoot();
var node = root.create(root);

console.log(root instanceof MyNodeAssigned); // true
console.log(node instanceof MyNodeAssigned); // true
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


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/drkibitz/qi-nodes/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

