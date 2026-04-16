Void Operator in JavaScript
TITLE Void Operator in JavaScript

The void operator in JavaScript evaluates an expression and returns undefined.

It is rarely used in everyday coding but is important to understand for interviews and advanced JavaScript concepts.

Overview
TITLE Void Operator in JavaScript - Overview

Syntax
javascript
void expression;
TITLE Void Operator in JavaScript - Syntax

Basic Example
javascript
let result = void (5 + 10);

console.log(result); // undefined
Even though 5 + 10 equals 15, the void operator ignores it and returns undefined.

TITLE Void Operator in JavaScript - Basic Example

Why Use the Void Operator?
TITLE Void Operator in JavaScript - Why Use the Void Operator?

To Explicitly Return undefined

javascript
function doNothing() {
  return void 0;
}

console.log(doNothing()); // undefined
TITLE Void Operator in JavaScript - 1. To Explicitly Return undefined

Prevent Page Navigation in Links

Used in older JavaScript practices:

xml
<a href="javascript:void(0)">Click Me</a>
Prevents the browser from navigating anywhere.

Keeps the page from refreshing.

TITLE Void Operator in JavaScript - 2. Prevent Page Navigation in Links

Avoid Returning Values in Arrow Functions

javascript
const logMessage = () => void console.log("Hello");

logMessage(); // Hello
Ensures the function returns undefined.

Useful when you don't want accidental returns.


}();
void ensures the function is treated as an expression.

TITLE Void Operator in JavaScript - 4. Immediately Invoked Function Expression (IIFE)
