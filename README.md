[![Build Status](https://travis-ci.org/drkibitz/qi-nodes.png?branch=master)](https://travis-ci.org/drkibitz/qi-nodes)
[![NPM version](https://badge.fury.io/js/qi-nodes.png)](http://badge.fury.io/js/qi-nodes)

# Qi Nodes

http://drkibitz.github.io/qi-nodes/

Base implementation for [composite patterns](http://en.wikipedia.org/wiki/Composite_pattern) in JavaScript.

## Usage

```javascript
var root = require('qi-nodes'),
    n1 = root.append(root.create()),
    n2 = root.append(root.create()),
    n3 = root.append(root.create());
// root -> n1 -> n2 -> n3

n1.swap(n3);
// root -> n3 -> n2 -> n1

var node = root.create();
node.swap(n2);
// root -> n3 -> node -> n1

var root2 = root.createRoot();
    n2_1 = root2.create().appendTo(root2),
    n2_2 = root2.create().appendTo(n2),
    n2_3 = root2.create().appendTo(n3);
// root2 -> n2_1 -> n2_2 -> n2_3

var root3 = root.createRoot();
    n3_1 = root3.create(root3),
    n3_2 = n1.create(n3_2),
    n3_3 = n2.create(n3_3);
// root3 -> n3_1 -> n3_2 -> n3_3

n3_2.swap(n2_2);
// root2 -> n2_1 -> n3_2 -> n2_3
// root3 -> n3_1 -> n2_2 -> n3_3
```
