class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insertAtTree(root, value) {
  if (root === null) {
    return new TreeNode(value);
  }
  if (value > root.value) {
    root.right = insertAtTree(root.right, value);
  } else if (value < root.value) {
    root.left = insertAtTree(root.left, value);
  }
  return root;
}

function search(root, target) {
  if (root === null) {
    return false;
  }
  if (target === root.value) {
    return true;
  } else if (target > root.value) {
    return search(root.right, target);
  } else {
    return search(root.left, target);
  }
}

function minValueNode(root) {
  let curr = root;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

function remove(root, value) {
  if (root === null) {
    return null;
  }

  if (value < root.value) {
    root.left = remove(root.left, value);
  } else if (value > root.value) {
    root.right = remove(root.right, value);
  } else {
    // Node with only one child or no child
    if (root.left === null) {
      return root.right;// in case of no child return null
    } else if (root.right === null) {
      return root.left;
    }

    // Node with two children: Get the inorder successor (smallest in the right subtree)
    let minNode = minValueNode(root.right);
    root.value = minNode.value;

    // Delete the inorder successor
    root.right = remove(root.right, minNode.value);
  }
  return root;
}

// Depth First Traversal

function preOrderTraversal(root, result = []) {
  if (root !== null) {
    result.push(root.value);
    preOrderTraversal(root.left, result);
    preOrderTraversal(root.right, result);
  }
  return result;
}

function inOrderTraversal(root, result = []) {
  if (root !== null) {
    inOrderTraversal(root.left, result);
    result.push(root.value);
    inOrderTraversal(root.right, result);
  }
  return result;
}

function postOrderTraversal(root, result = []) {
  if (root !== null) {
    postOrderTraversal(root.left, result);
    postOrderTraversal(root.right, result);
    result.push(root.value);
  }
  return result;
}

// Breadth First Traversal

function levelOrderTraversal(root) {
  if (root === null) {
    return [];
  }
  let queue = [];
  queue.push(root);
  let result = [];
  while (queue.length > 0) {
    let levelSize = queue.length;
    let currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      let current = queue.shift();
      currentLevel.push(current.value);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    result.push(currentLevel);
  }
  return result;
}
function levelOrderTraversal2(root){
if(root==null){
    return null
}
let queue = [root];
let result = [];
while(queue.length>0){
    let currentNode=queue.shift();
     result.push(currentNode.value)
     if(currentNode.left!==null){
         queue.push(currentNode.left);
     }
     if(currentNode.right!==null){
         queue.push(currentNode.right)
     }
    
}

return result
}
function treeHeight(root) {
  if (root === null) {
    return 0;
  }
  return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
}

function countNodes(root) {
  if (root === null) {
    return 0;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
}
// Example Usage

// 1. Creating a Binary Search Tree
let root = null;
root = insertAtTree(root, 50);
root = insertAtTree(root, 30);
root = insertAtTree(root, 70);
root = insertAtTree(root, 20);
root = insertAtTree(root, 40);
root = insertAtTree(root, 60);
root = insertAtTree(root, 80);

console.log("Tree after insertion:");
// Expected output for inOrderTraversal: [20, 30, 40, 50, 60, 70, 80]
console.log("In-order Traversal:", inOrderTraversal(root));

// 2. Searching in the Tree
console.log("Search for 40:", search(root, 40)); // Expected output: true
console.log("Search for 25:", search(root, 25)); // Expected output: false

// 3. Removing a Node
root = remove(root, 20); // Remove leaf node
console.log("Tree after removing 20:");
console.log("In-order Traversal:", inOrderTraversal(root)); // Expected output: [30, 40, 50, 60, 70, 80]

root = remove(root, 30); // Remove node with one child
console.log("Tree after removing 30:");
console.log("In-order Traversal:", inOrderTraversal(root)); // Expected output: [40, 50, 60, 70, 80]

root = remove(root, 50); // Remove node with two children
console.log("Tree after removing 50:");
console.log("In-order Traversal:", inOrderTraversal(root)); // Expected output: [40, 60, 70, 80]

// 4. Tree Traversals
console.log("Pre-order Traversal:", preOrderTraversal(root)); // Expected output: [60, 40, 70, 80]
console.log("Post-order Traversal:", postOrderTraversal(root)); // Expected output: [40, 80, 70, 60]
console.log("Level-order Traversal:", levelOrderTraversal(root)); // Expected output: [[60], [40, 70], [80]]
console.log("Level-order Traversal Version2:", levelOrderTraversal2(root))
// 5. Additional Operations
console.log("Height of tree:", treeHeight(root)); // Expected output: 3
console.log("Number of nodes in tree:", countNodes(root)); // Expected output: 4
