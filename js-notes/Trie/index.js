class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the Trie
    insert(word) {
        let currentNode = this.root;
        for (let char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    // Search for a word in the Trie
    search(word) {
        let currentNode = this.root;
        for (let char of word) {
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode.isEndOfWord;
    }

    // Helper function to find the node where the prefix ends
    _getNodeForPrefix(prefix) {
        let currentNode = this.root;
        for (let char of prefix) {
            if (!currentNode.children[char]) {
                return null;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode;
    }

    // Get all words in the Trie that start with the given prefix
    findWordsWithPrefix(prefix) {
        const result = [];
        const node = this._getNodeForPrefix(prefix);
        
        if (node) {
            this._findAllWords(node, prefix, result);
        }

        return result;
    }

    // Helper function to gather all words from a given Trie node
    _findAllWords(node, prefix, result) {
        if (node.isEndOfWord) {
            result.push(prefix);
        }

        for (let char in node.children) {
            this._findAllWords(node.children[char], prefix + char, result);
        }
    }
}

// Example usage:
const trie = new Trie();
trie.insert("cat");
trie.insert("cap");
trie.insert("bat");
trie.insert("bar");
trie.insert("can");

console.log(trie.findWordsWithPrefix("ca")); // Output: ["cat", "cap", "can"]
console.log(trie.findWordsWithPrefix("ba")); // Output: ["bat", "bar"]
console.log(trie.findWordsWithPrefix("xyz")); // Output: []
