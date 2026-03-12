/**
 * closures.js
 * 
 * This file demonstrates the concept of Closures in JavaScript.
 * You can upload this file directly to GitHub as a learning reference.
 */

/*
------------------------------------------------------------
1. BASIC CLOSURE
------------------------------------------------------------
A closure happens when an inner function remembers variables
from its outer function even after the outer function has finished executing.
*/

function outerFunction() {
  let message = "Hello from outer function";

  function innerFunction() {
    console.log(message); // inner function remembers message
  }

  return innerFunction;
}

const closureExample = outerFunction();
closureExample(); // Output: Hello from outer function



/*
------------------------------------------------------------
2. CLOSURE WITH PRIVATE VARIABLE
------------------------------------------------------------
Closures can be used to create private variables.
The variable cannot be accessed directly from outside.
*/

function createCounter() {
  let count = 0;

  return function () {
    count++;
    console.log("Current count:", count);
  };
}

const counter = createCounter();

counter(); // 1
counter(); // 2
counter(); // 3



/*
------------------------------------------------------------
3. MULTIPLE CLOSURE INSTANCES
------------------------------------------------------------
Each function call creates a new closure with its own memory.
*/

function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12



/*
------------------------------------------------------------
4. PRACTICAL INTERVIEW EXAMPLE
------------------------------------------------------------
Closures are often used in event handlers, callbacks,
and asynchronous programming.
*/

function greeting(name) {
  return function () {
    console.log("Hello " + name);
  };
}

const greetSandhya = greeting("Sandhya");
greetSandhya();



/*
------------------------------------------------------------
5. COMMON INTERVIEW QUESTION
------------------------------------------------------------
What will be the output?
*/

for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 1000);
}

/*
Output:
var loop: 4
var loop: 4
var loop: 4

Reason:
var is function-scoped, so all callbacks share the same 'i'.
*/



/*
------------------------------------------------------------
6. FIX USING LET (BLOCK SCOPE)
------------------------------------------------------------
*/

for (let j = 1; j <= 3; j++) {
  setTimeout(function () {
    console.log("let loop:", j);
  }, 1000);
}

/*
Output:
let loop: 1
let loop: 2
let loop: 3
*/

console.log("Closures file loaded successfully.");
