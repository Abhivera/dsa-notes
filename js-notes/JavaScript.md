# JavaScript Complete Crash Course

## Table of Contents
1. [Variables and Data Types](#variables-and-data-types)
2. [Operators](#operators)
3. [Control Structures](#control-structures)
4. [Functions](#functions)
5. [Objects and Arrays](#objects-and-arrays)
6. [Scope and Hoisting](#scope-and-hoisting)
7. [Closures](#closures)
8. [Prototypes and Classes](#prototypes-and-classes)
9. [Asynchronous JavaScript](#asynchronous-javascript)
10. [DOM Manipulation](#dom-manipulation)
11. [Error Handling](#error-handling)
12. [Modern JavaScript Features](#modern-javascript-features)

---

## Variables and Data Types

### Variable Declarations
```javascript
// var - function-scoped, hoisted, can be redeclared
var name = "John";
var name = "Jane"; // Allowed

// let - block-scoped, hoisted but not initialized, cannot be redeclared
let age = 25;
// let age = 30; // Error!

// const - block-scoped, must be initialized, immutable binding
const PI = 3.14159;
// PI = 3.14; // Error!
```

### Primitive Data Types
```javascript
// Number
let integer = 42;
let float = 3.14;
let scientific = 2e5; // 200000
let infinity = Infinity;
let notANumber = NaN;

// String
let singleQuote = 'Hello';
let doubleQuote = "World";
let template = `Hello ${name}`; // Template literal
let multiline = `Line 1
Line 2`;

// Boolean
let isTrue = true;
let isFalse = false;

// Undefined
let undefinedVar;
console.log(undefinedVar); // undefined

// Null
let nullVar = null;

// Symbol (ES6)
let sym = Symbol('description');
let sym2 = Symbol('description');
console.log(sym === sym2); // false

// BigInt (ES2020)
let bigInt = 123456789012345678901234567890n;
```

### Type Checking and Conversion
```javascript
// typeof operator
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (known quirk)
console.log(typeof {}); // "object"
console.log(typeof []); // "object"

// Type conversion
let num = Number("123"); // 123
let str = String(123); // "123"
let bool = Boolean(0); // false

// Implicit conversion (coercion)
console.log("5" + 3); // "53"
console.log("5" - 3); // 2
console.log("5" * "3"); // 15
```

---

## Operators

### Arithmetic Operators
```javascript
let a = 10, b = 3;

console.log(a + b); // 13 (Addition)
console.log(a - b); // 7 (Subtraction)
console.log(a * b); // 30 (Multiplication)
console.log(a / b); // 3.333... (Division)
console.log(a % b); // 1 (Modulo)
console.log(a ** b); // 1000 (Exponentiation)

// Increment/Decrement
let x = 5;
console.log(++x); // 6 (pre-increment)
console.log(x++); // 6 (post-increment, x becomes 7)
console.log(--x); // 6 (pre-decrement)
console.log(x--); // 6 (post-decrement, x becomes 5)
```

### Comparison Operators
```javascript
console.log(5 == "5"); // true (loose equality)
console.log(5 === "5"); // false (strict equality)
console.log(5 != "5"); // false (loose inequality)
console.log(5 !== "5"); // true (strict inequality)

console.log(10 > 5); // true
console.log(10 >= 10); // true
console.log(5 < 10); // true
console.log(5 <= 5); // true
```

### Logical Operators
```javascript
let p = true, q = false;

console.log(p && q); // false (AND)
console.log(p || q); // true (OR)
console.log(!p); // false (NOT)

// Short-circuit evaluation
let result = null || "default"; // "default"
let name = user && user.name; // undefined if user is falsy
```

### Assignment Operators
```javascript
let x = 10;
x += 5; // x = x + 5 → 15
x -= 3; // x = x - 3 → 12
x *= 2; // x = x * 2 → 24
x /= 4; // x = x / 4 → 6
x %= 4; // x = x % 4 → 2
x **= 3; // x = x ** 3 → 8
```

### Other Operators
```javascript
// Ternary operator
let status = age >= 18 ? "adult" : "minor";

// Nullish coalescing (ES2020)
let name = null ?? "Anonymous"; // "Anonymous"
let value = 0 ?? "default"; // 0 (only null/undefined trigger default)

// Optional chaining (ES2020)
let userName = user?.profile?.name;

// Spread operator
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Rest operator
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
```

---

## Control Structures

### Conditional Statements
```javascript
// if-else
let score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// switch statement
let day = "Monday";
switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        console.log("Weekday");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;
    default:
        console.log("Invalid day");
}
```

### Loops
```javascript
// for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// for...in (iterates over object properties)
let obj = {a: 1, b: 2, c: 3};
for (let key in obj) {
    console.log(key, obj[key]);
}

// for...of (iterates over iterable values)
let arr = [1, 2, 3, 4, 5];
for (let value of arr) {
    console.log(value);
}

// while loop
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// do-while loop
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 5);

// break and continue
for (let i = 0; i < 10; i++) {
    if (i === 3) continue; // Skip 3
    if (i === 7) break; // Exit loop at 7
    console.log(i);
}
```

---

## Functions

### Function Declaration vs Expression
```javascript
// Function Declaration (hoisted)
function greet(name) {
    return `Hello, ${name}!`;
}

// Function Expression (not hoisted)
const greet2 = function(name) {
    return `Hello, ${name}!`;
};

// Arrow Functions (ES6)
const greet3 = (name) => `Hello, ${name}!`;
const greet4 = name => `Hello, ${name}!`; // Single parameter
const add = (a, b) => a + b; // Single expression
const multiply = (a, b) => {
    const result = a * b;
    return result;
}; // Multiple statements
```

### Function Parameters
```javascript
// Default parameters
function greet(name = "Anonymous", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Destructuring parameters
function createUser({name, age, email}) {
    return {name, age, email, id: Date.now()};
}

const user = createUser({name: "John", age: 30, email: "john@email.com"});
```

### Higher-Order Functions
```javascript
// Function that takes another function as parameter
function processData(data, callback) {
    return callback(data);
}

// Function that returns another function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
console.log(double(5)); // 10

// Array methods (higher-order functions)
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, x) => acc + x, 0); // 15
numbers.forEach(x => console.log(x)); // Prints each number

// Find methods
const found = numbers.find(x => x > 3); // 4
const foundIndex = numbers.findIndex(x => x > 3); // 3
const hasEven = numbers.some(x => x % 2 === 0); // true
const allPositive = numbers.every(x => x > 0); // true
```

---

## Objects and Arrays

### Object Creation and Manipulation
```javascript
// Object literal
const person = {
    name: "John",
    age: 30,
    city: "New York",
    hobbies: ["reading", "swimming"],
    
    // Method
    greet: function() {
        return `Hello, I'm ${this.name}`;
    },
    
    // ES6 method shorthand
    introduce() {
        return `I'm ${this.name}, ${this.age} years old`;
    }
};

// Property access
console.log(person.name); // Dot notation
console.log(person["age"]); // Bracket notation
console.log(person["first-name"]); // Required for properties with special characters

// Dynamic property access
const prop = "city";
console.log(person[prop]); // "New York"

// Adding/modifying properties
person.email = "john@email.com";
person.age = 31;

// Deleting properties
delete person.city;

// Object methods
console.log(Object.keys(person)); // Array of property names
console.log(Object.values(person)); // Array of property values
console.log(Object.entries(person)); // Array of [key, value] pairs

// Object.assign (shallow copy and merge)
const newPerson = Object.assign({}, person, {country: "USA"});

// Destructuring
const {name, age} = person;
const {name: personName, age: personAge} = person; // Renaming
```

### Arrays and Array Methods
```javascript
// Array creation
const fruits = ["apple", "banana", "orange"];
const numbers = new Array(1, 2, 3, 4, 5);
const empty = new Array(5); // Creates array with 5 empty slots

// Array access and modification
console.log(fruits[0]); // "apple"
fruits[1] = "grape"; // Modify element
fruits.length = 2; // Truncate array

// Array methods - Mutating
fruits.push("kiwi"); // Add to end
fruits.pop(); // Remove from end
fruits.unshift("mango"); // Add to beginning
fruits.shift(); // Remove from beginning
fruits.splice(1, 1, "pear", "plum"); // Remove 1 element at index 1, add 2 elements

// Array methods - Non-mutating
const sliced = fruits.slice(1, 3); // Extract portion
const joined = fruits.join(", "); // Convert to string
const concatenated = fruits.concat(["fig", "date"]); // Merge arrays

// Array searching
const index = fruits.indexOf("apple"); // First occurrence
const lastIndex = fruits.lastIndexOf("apple"); // Last occurrence
const includes = fruits.includes("banana"); // Boolean check

// Array iteration
fruits.forEach((fruit, index) => console.log(`${index}: ${fruit}`));
const uppercased = fruits.map(fruit => fruit.toUpperCase());
const longFruits = fruits.filter(fruit => fruit.length > 5);

// Array testing
const hasLongFruit = fruits.some(fruit => fruit.length > 6);
const allShortFruits = fruits.every(fruit => fruit.length < 10);

// Array reduction
const totalLength = fruits.reduce((total, fruit) => total + fruit.length, 0);
const longest = fruits.reduce((longest, current) => 
    current.length > longest.length ? current : longest
);

// Array sorting
const sorted = [...fruits].sort(); // Alphabetical
const numbers2 = [3, 1, 4, 1, 5, 9];
const sortedNumbers = [...numbers2].sort((a, b) => a - b); // Numerical ascending
```

### Advanced Object Concepts
```javascript
// Object.create
const personPrototype = {
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

const john = Object.create(personPrototype);
john.name = "John";

// Property descriptors
Object.defineProperty(person, 'ssn', {
    value: '123-45-6789',
    writable: false,
    enumerable: false,
    configurable: false
});

// Getters and setters
const user = {
    _name: '',
    get name() {
        return this._name.toUpperCase();
    },
    set name(value) {
        if (typeof value === 'string' && value.length > 0) {
            this._name = value;
        }
    }
};

// Object sealing and freezing
Object.seal(obj); // Prevents adding/removing properties
Object.freeze(obj); // Prevents any modifications
```

---

## Scope and Hoisting

### Variable Scope
```javascript
// Global scope
var globalVar = "I'm global";
let globalLet = "I'm also global";
const globalConst = "Me too";

function outerFunction() {
    // Function scope
    var functionScoped = "I'm function scoped";
    let blockScoped = "I'm block scoped";
    
    if (true) {
        // Block scope
        var functionScoped2 = "I'm still function scoped";
        let blockScoped2 = "I'm block scoped";
        const blockScoped3 = "I'm also block scoped";
        
        console.log(functionScoped); // Accessible
        console.log(blockScoped); // Accessible
    }
    
    console.log(functionScoped2); // Accessible
    // console.log(blockScoped2); // Error: not accessible
    
    function innerFunction() {
        console.log(functionScoped); // Accessible (lexical scoping)
        console.log(globalVar); // Accessible
    }
}
```

### Hoisting
```javascript
// Variable hoisting
console.log(hoistedVar); // undefined (not error)
var hoistedVar = "I'm hoisted";

// console.log(letVar); // ReferenceError
let letVar = "I'm not hoisted";

// Function hoisting
sayHello(); // Works! Prints "Hello"
function sayHello() {
    console.log("Hello");
}

// Function expression - not hoisted
// sayGoodbye(); // TypeError: sayGoodbye is not a function
var sayGoodbye = function() {
    console.log("Goodbye");
};

// Temporal Dead Zone (TDZ)
function example() {
    // console.log(x); // ReferenceError
    let x = 10;
    console.log(x); // 10
}
```

---

## Closures

### Basic Closures
```javascript
function outerFunction(x) {
    // Outer function's variable
    
    function innerFunction(y) {
        // Inner function has access to outer function's variables
        return x + y;
    }
    
    return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(10)); // 15

// The inner function "closes over" the outer function's variables
```

### Practical Closure Examples
```javascript
// Counter example
function createCounter() {
    let count = 0;
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2

// Module pattern
const calculator = (function() {
    let result = 0;
    
    return {
        add(x) {
            result += x;
            return this;
        },
        multiply(x) {
            result *= x;
            return this;
        },
        getResult() {
            return result;
        },
        reset() {
            result = 0;
            return this;
        }
    };
})();

calculator.add(5).multiply(2).add(3);
console.log(calculator.getResult()); // 13

// Function factory
function createMultiplier(multiplier) {
    return function(x) {
        return x * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(4)); // 12
```

---

## Prototypes and Classes

### Prototype-based Inheritance
```javascript
// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding methods to prototype
Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

Person.prototype.getAge = function() {
    return this.age;
};

const person1 = new Person("John", 30);
console.log(person1.greet()); // "Hello, I'm John"

// Prototype chain
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true

// Inheritance with prototypes
function Student(name, age, major) {
    Person.call(this, name, age); // Call parent constructor
    this.major = major;
}

// Set up inheritance
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// Add student-specific methods
Student.prototype.study = function() {
    return `${this.name} is studying ${this.major}`;
};

const student1 = new Student("Alice", 20, "Computer Science");
console.log(student1.greet()); // Inherited method
console.log(student1.study()); // Own method
```

### ES6 Classes
```javascript
// Class declaration
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Instance methods
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    getAge() {
        return this.age;
    }
    
    // Static method
    static species() {
        return "Homo sapiens";
    }
    
    // Getter
    get info() {
        return `${this.name}, ${this.age}`;
    }
    
    // Setter
    set age(newAge) {
        if (newAge > 0) {
            this._age = newAge;
        }
    }
}

// Class inheritance
class Student extends Person {
    constructor(name, age, major) {
        super(name, age); // Call parent constructor
        this.major = major;
    }
    
    study() {
        return `${this.name} is studying ${this.major}`;
    }
    
    // Override parent method
    greet() {
        return `${super.greet()}, I'm a student`;
    }
}

const student = new Student("Bob", 22, "Physics");
console.log(student.greet()); // "Hello, I'm Bob, I'm a student"
console.log(Person.species()); // "Homo sapiens"

// Private fields (ES2022)
class BankAccount {
    #balance = 0; // Private field
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
    
    #validateAmount(amount) { // Private method
        return amount > 0;
    }
}
```

---

## Asynchronous JavaScript

### Callbacks
```javascript
// Basic callback
function fetchData(callback) {
    setTimeout(() => {
        const data = {id: 1, name: "John"};
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log("Received:", data);
});

// Callback hell
function step1(callback) {
    setTimeout(() => callback(null, "Step 1 complete"), 1000);
}

function step2(callback) {
    setTimeout(() => callback(null, "Step 2 complete"), 1000);
}

function step3(callback) {
    setTimeout(() => callback(null, "Step 3 complete"), 1000);
}

// Nested callbacks (callback hell)
step1((err, result1) => {
    if (err) throw err;
    console.log(result1);
    
    step2((err, result2) => {
        if (err) throw err;
        console.log(result2);
        
        step3((err, result3) => {
            if (err) throw err;
            console.log(result3);
        });
    });
});
```

### Promises
```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
        if (success) {
            resolve("Operation successful!");
        } else {
            reject(new Error("Operation failed!"));
        }
    }, 1000);
});

// Using Promises
myPromise
    .then(result => {
        console.log(result);
        return "Next step";
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error("Error:", error.message);
    })
    .finally(() => {
        console.log("Promise completed");
    });

// Promise methods
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(values => console.log(values)); // [1, 2, 3]

Promise.race([promise1, promise2, promise3])
    .then(value => console.log(value)); // 1 (first to resolve)

Promise.allSettled([promise1, promise2, Promise.reject("error")])
    .then(results => console.log(results));
// [{status: "fulfilled", value: 1}, {...}, {status: "rejected", reason: "error"}]

// Promise chaining to avoid callback hell
function fetchUser(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve({id, name: "John"}), 1000);
    });
}

function fetchPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([{id: 1, title: "Post 1"}]), 1000);
    });
}

fetchUser(1)
    .then(user => {
        console.log("User:", user);
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

### Async/Await
```javascript
// Basic async function
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

// Using async/await
async function main() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error("Main error:", error);
    }
}

// Parallel async operations
async function fetchMultipleData() {
    try {
        // Sequential (slower)
        const user = await fetchUser(1);
        const posts = await fetchPosts(user.id);
        
        // Parallel (faster)
        const [userData, postsData] = await Promise.all([
            fetchUser(1),
            fetchPosts(1)
        ]);
        
        return {userData, postsData};
    } catch (error) {
        console.error("Error:", error);
    }
}

// Async iteration
async function processItems(items) {
    for (const item of items) {
        await processItem(item);
    }
}

// Async generators
async function* dataGenerator() {
    let i = 0;
    while (i < 5) {
        yield new Promise(resolve => 
            setTimeout(() => resolve(i++), 1000)
        );
    }
}

async function consumeGenerator() {
    for await (const value of dataGenerator()) {
        console.log(await value);
    }
}
```

---

## DOM Manipulation

### Selecting Elements
```javascript
// By ID
const element = document.getElementById('myId');

// By class name
const elements = document.getElementsByClassName('myClass');
const elementsQuery = document.querySelectorAll('.myClass');

// By tag name
const paragraphs = document.getElementsByTagName('p');

// Query selectors
const firstButton = document.querySelector('button');
const allButtons = document.querySelectorAll('button');
const specificElement = document.querySelector('#myId .myClass');

// Modern selectors
const closestParent = element.closest('.parent-class');
const nextSibling = element.nextElementSibling;
const children = element.children;
```

### Modifying Elements
```javascript
// Content manipulation
element.textContent = "New text content";
element.innerHTML = "<strong>New HTML content</strong>";
element.innerText = "New inner text"; // Respects styling

// Attribute manipulation
element.setAttribute('data-value', '123');
element.getAttribute('data-value');
element.removeAttribute('data-value');
element.hasAttribute('data-value');

// Class manipulation
element.className = "class1 class2";
element.classList.add('new-class');
element.classList.remove('old-class');
element.classList.toggle('active');
element.classList.contains('active');

// Style manipulation
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.cssText = 'color: red; background: blue;';

// Computed styles
const computedStyle = getComputedStyle(element);
console.log(computedStyle.color);
```

### Creating and Inserting Elements
```javascript
// Create elements
const newDiv = document.createElement('div');
const newText = document.createTextNode('Hello World');

// Configure element
newDiv.className = 'new-element';
newDiv.id = 'unique-id';
newDiv.textContent = 'New content';

// Insert elements
parent.appendChild(newDiv);
parent.insertBefore(newDiv, referenceElement);
element.insertAdjacentHTML('beforeend', '<p>New paragraph</p>');
element.insertAdjacentElement('afterbegin', newDiv);

// Modern insertion methods
parent.prepend(newDiv); // Beginning
parent.append(newDiv); // End
element.before(newDiv); // Before element
element.after(newDiv); // After element
element.replaceWith(newDiv); // Replace element

// Remove elements
element.remove();
parent.removeChild(element);
```

### Event Handling
```javascript
// Add event listeners
button.addEventListener('click', function(event) {
    console.log('Button clicked!', event);
});

// Arrow function event handler
button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event bubbling
    console.log('Clicked!');
});

// Event object properties
document.addEventListener('click', (event) => {
    console.log('Target:', event.target);
    console.log('Current target:', event.currentTarget);
    console.log('Mouse position:', event.clientX, event.clientY);
    console.log('Key pressed:', event.key);
});

// Remove event listeners
function handleClick() {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Event delegation
document.addEventListener('click', (event) => {
    if (event.target.matches('.button-class')) {
        console.log('Delegated click!');
    }
});

// Common events
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
input.addEventListener('input', handler);
form.addEventListener('submit', handler);
window.addEventListener('resize', handler);
document.addEventListener('DOMContentLoaded', handler);
```

### Form Handling
```javascript
// Form elements
const form = document.querySelector('#myForm');
const input = document.querySelector('#myInput');
const select = document.querySelector('#mySelect');
const checkbox = document.querySelector('#myCheckbox');

// Get form data
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    
    // Or manually
    const manualData = {
        name: input.value,
        email: form.elements.email.value,
        checked: checkbox.checked,
        selected: select.value
    };
});

// Form validation
input.addEventListener('blur', () => {
    if (!input.value) {
        input.setCustomValidity('This field is required');
    } else {
        input.setCustomValidity('');
    }
});
```

---

## Error Handling

### Try-Catch-Finally
```javascript
// Basic error handling
try {
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error('An error occurred:', error.message);
    console.error('Stack trace:', error.stack);
} finally {
    console.log('This always runs');
}

// Specific error types
try {
    JSON.parse('invalid json');
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error('JSON syntax error:', error.message);
    } else if (error instanceof ReferenceError) {
        console.error('Reference error:', error.message);
    } else {
        console.error('Unknown error:', error);
    }
}

// Throwing custom errors
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

// Custom error classes
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateAge(age) {
    if (age < 0 || age > 150) {
        throw new ValidationError('Age must be between 0 and 150');
    }
    return true;
}

try {
    validateAge(-5);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation failed:', error.message);
    }
}
```

### Async Error Handling
```javascript
// Promise error handling
fetchData()
    .then(data => processData(data))
    .catch(error => {
        console.error('Promise error:', error);
        return defaultData; // Fallback
    });

// Async/await error handling
async function handleAsyncOperation() {
    try {
        const data = await fetchData();
        const processed = await processData(data);
        return processed;
    } catch (error) {
        console.error('Async error:', error);
        throw error; // Re-throw if needed
    }
}

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault(); // Prevent default browser behavior
});
```

---

## Modern JavaScript Features

### Destructuring
```javascript
// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary, tertiary] = colors;
const [first, , third] = colors; // Skip middle element
const [head, ...tail] = colors; // Rest operator

// Default values
const [a = 1, b = 2, c = 3] = [10]; // a=10, b=2, c=3

// Object destructuring
const person = {name: 'John', age: 30, city: 'New York'};
const {name, age} = person;
const {name: personName, age: personAge} = person; // Renaming
const {name, age, country = 'USA'} = person; // Default value

// Nested destructuring
const user = {
    id: 1,
    profile: {
        name: 'John',
        settings: {
            theme: 'dark'
        }
    }
};
const {profile: {name, settings: {theme}}} = user;

// Function parameter destructuring
function greetUser({name, age, city = 'Unknown'}) {
    return `Hello ${name}, ${age} years old from ${city}`;
}

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x]; // x=2, y=1
```

### Template Literals
```javascript
// Basic template literals
const name = 'World';
const greeting = `Hello, ${name}!`;

// Multi-line strings
const multiline = `
    This is a
    multi-line
    string
`;

// Expression evaluation
const a = 5, b = 10;
const result = `The sum of ${a} and ${b} is ${a + b}`;

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : '';
        return result + string + value;
    }, '');
}

const highlighted = highlight`Hello ${name}, you have ${5} messages`;
```

### Modules (ES6)
```javascript
// export.js - Named exports
export const PI = 3.14159;
export function add(a, b) {
    return a + b;
}
export class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

// Default export
export default function subtract(a, b) {
    return a - b;
}

// import.js - Importing
import subtract, {PI, add, Calculator} from './export.js';
import * as MathUtils from './export.js';
import {add as addFunction} from './export.js'; // Renaming

// Dynamic imports
async function loadModule() {
    const module = await import('./export.js');
    return module.add(5, 3);
}

// Re-exports
export {add, PI} from './export.js';
export * from './export.js';
```

### Advanced Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// flat() - Flatten arrays
const nested = [1, [2, 3], [4, [5, 6]]];
const flat1 = nested.flat(); // [1, 2, 3, 4, [5, 6]]
const flatAll = nested.flat(Infinity); // [1, 2, 3, 4, 5, 6]

// flatMap() - Map then flatten
const words = ['hello', 'world'];
const letters = words.flatMap(word => word.split('')); // ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// Array.from() - Create arrays
const arrayFromString = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const range = Array.from({length: 5}, (_, i) => i); // [0, 1, 2, 3, 4]

// at() - Get element at index (including negative)
const last = numbers.at(-1); // 5
const secondLast = numbers.at(-2); // 4
```

### Object Enhancements
```javascript
// Shorthand properties
const name = 'John';
const age = 30;
const person = {name, age}; // {name: 'John', age: 30}

// Computed property names
const key = 'dynamicKey';
const obj = {
    [key]: 'value',
    [`${key}2`]: 'value2'
};

// Method definitions
const calculator = {
    // Method shorthand
    add(a, b) {
        return a + b;
    },
    
    // Generator method
    *numberGenerator() {
        yield 1;
        yield 2;
        yield 3;
    },
    
    // Async method
    async fetchData() {
        const response = await fetch('/api/data');
        return response.json();
    }
};

// Object spread
const original = {a: 1, b: 2};
const copy = {...original}; // Shallow copy
const extended = {...original, c: 3, a: 10}; // Override 'a'

// Object.entries(), keys(), values()
const data = {x: 1, y: 2, z: 3};
Object.entries(data).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

### Symbols and Iterators
```javascript
// Symbols
const sym1 = Symbol('description');
const sym2 = Symbol.for('global-symbol'); // Global symbol registry

// Symbol properties
const obj = {
    [sym1]: 'value1',
    [Symbol.iterator]: function*() {
        yield 1;
        yield 2;
        yield 3;
    }
};

// Well-known symbols
class CustomIterable {
    constructor(data) {
        this.data = data;
    }
    
    *[Symbol.iterator]() {
        for (let item of this.data) {
            yield item;
        }
    }
}

const iterable = new CustomIterable([1, 2, 3]);
for (let value of iterable) {
    console.log(value); // 1, 2, 3
}

// Generators
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
```

### New Data Structures
```javascript
// Map
const map = new Map();
map.set('key1', 'value1');
map.set(42, 'number key');
map.set({}, 'object key');

console.log(map.get('key1')); // 'value1'
console.log(map.has('key1')); // true
console.log(map.size); // 3

// Iterate over Map
for (let [key, value] of map) {
    console.log(`${key} => ${value}`);
}

// WeakMap - Weak references, garbage collected
const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, 'some data');
obj = null; // Object can be garbage collected

// Set
const set = new Set([1, 2, 3, 3, 4]);
console.log(set); // Set {1, 2, 3, 4}

set.add(5);
set.delete(1);
console.log(set.has(2)); // true

// Set operations
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);

// Union
const union = new Set([...set1, ...set2]); // {1, 2, 3, 4, 5}

// Intersection
const intersection = new Set([...set1].filter(x => set2.has(x))); // {3}

// Difference
const difference = new Set([...set1].filter(x => !set2.has(x))); // {1, 2}

// WeakSet - Weak references
const weakSet = new WeakSet();
let obj1 = {};
weakSet.add(obj1);
obj1 = null; // Can be garbage collected
```

### Optional Chaining and Nullish Coalescing
```javascript
// Optional chaining (?.)
const user = {
    profile: {
        name: 'John',
        address: {
            street: '123 Main St'
        }
    }
};

// Safe property access
const street = user?.profile?.address?.street; // '123 Main St'
const zipCode = user?.profile?.address?.zipCode; // undefined

// Safe method calling
user?.profile?.getName?.(); // Won't throw if getName doesn't exist

// Safe bracket notation
const key = 'dynamicKey';
const value = user?.profile?.[key];

// Nullish coalescing (??)
const username = user?.profile?.name ?? 'Anonymous';
const port = process?.env?.PORT ?? 3000;

// Logical assignment operators (ES2021)
let a = null;
a ??= 'default'; // Only assign if a is null/undefined

let b = '';
b ||= 'default'; // Assign if b is falsy

let c = 10;
c &&= c * 2; // Only assign if c is truthy
```

### Private Fields and Methods
```javascript
// Private fields (ES2022)
class BankAccount {
    #balance = 0; // Private field
    #accountNumber; // Private field declaration
    
    constructor(initialBalance, accountNumber) {
        this.#balance = initialBalance;
        this.#accountNumber = accountNumber;
    }
    
    // Private method
    #validateAmount(amount) {
        return typeof amount === 'number' && amount > 0;
    }
    
    // Public method
    deposit(amount) {
        if (this.#validateAmount(amount)) {
            this.#balance += amount;
            return this.#balance;
        }
        throw new Error('Invalid amount');
    }
    
    // Getter for private field
    get balance() {
        return this.#balance;
    }
    
    // Static private field
    static #bankName = 'MyBank';
    
    static #validateBankOperation() {
        return true;
    }
}

const account = new BankAccount(1000, '12345');
console.log(account.balance); // 1000
// console.log(account.#balance); // SyntaxError: Private field
```

### Top-level await (ES2022)
```javascript
// Can use await at module top level
const data = await fetch('/api/data').then(r => r.json());

// Conditional imports
const theme = await import(
    isDark ? './dark-theme.js' : './light-theme.js'
);

// Dynamic module loading
const modules = await Promise.all([
    import('./module1.js'),
    import('./module2.js')
]);
```

---

## Best Practices and Tips

### Performance Optimization
```javascript
// Debouncing
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedSearch = debounce(searchFunction, 300);

// Throttling
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const throttledScroll = throttle(scrollHandler, 100);

// Memoization
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const memoizedExpensiveFunction = memoize(expensiveFunction);
```

### Common Patterns
```javascript
// Singleton pattern
const Singleton = (function() {
    let instance;
    
    function createInstance() {
        return {
            name: 'Singleton Instance',
            method() {
                return 'Hello from singleton';
            }
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// Observer pattern
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
    
    off(event, listenerToRemove) {
        if (this.events[event]) {
            this.events[event] = this.events[event]
                .filter(listener => listener !== listenerToRemove);
        }
    }
}

// Factory pattern
class UserFactory {
    static createUser(type, data) {
        switch (type) {
            case 'admin':
                return new AdminUser(data);
            case 'regular':
                return new RegularUser(data);
            default:
                throw new Error('Invalid user type');
        }
    }
}
```

### Code Quality Tips
```javascript
// Use strict mode
'use strict';

// Consistent naming conventions
const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

// Use meaningful variable names
const isUserLoggedIn = checkUserAuthentication();
const userAccountBalance = getUserBalance();

// Function purity
// Pure function - always returns same output for same input
function add(a, b) {
    return a + b;
}

// Impure function - depends on external state
let total = 0;
function addToTotal(value) {
    total += value; // Modifies external state
    return total;
}

// Prefer immutability
const originalArray = [1, 2, 3];
const newArray = [...originalArray, 4]; // Don't mutate original

const originalObject = {name: 'John', age: 30};
const updatedObject = {...originalObject, age: 31}; // Don't mutate original

// Error handling best practices
class APIError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'APIError';
        this.status = status;
    }
}

async function apiCall(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new APIError(`API call failed: ${response.statusText}`, response.status);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof APIError) {
            console.error(`API Error (${error.status}): ${error.message}`);
        } else {
            console.error('Network error:', error.message);
        }
        throw error;
    }
}
```

---

## Summary

This crash course covered:

**Core Concepts:**
- Variables, data types, and type conversion
- Operators and expressions
- Control flow and loops
- Functions and scope

**Advanced Features:**
- Objects, arrays, and destructuring
- Prototypes, classes, and inheritance
- Closures and lexical scoping
- Asynchronous programming (callbacks, promises, async/await)

**Modern JavaScript:**
- ES6+ features (arrow functions, template literals, modules)
- New data structures (Map, Set, WeakMap, WeakSet)
- Advanced syntax (optional chaining, nullish coalescing)
- Private fields and top-level await

**Practical Applications:**
- DOM manipulation and event handling
- Error handling and debugging
- Performance optimization techniques
- Common design patterns

**Best Practices:**
- Code organization and modularity
- Immutability and pure functions
- Proper error handling
- Performance considerations

Remember to practice these concepts by building projects and experimenting with the code examples. JavaScript is best learned through hands-on experience!