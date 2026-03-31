# Void Operator in JavaScript

## Overview
The `void` operator in JavaScript evaluates an expression and returns `undefined`.

It is rarely used in everyday coding but is important to understand for interviews and advanced JavaScript concepts.

---

## Syntax

```javascript
void expression;

Basic Example
let result = void (5 + 10);

console.log(result); // undefined

Even though 5 + 10 equals 15, the void operator ignores it and returns undefined.
Why Use the Void Operator?
1. To Explicitly Return undefined
function doNothing() {
  return void 0;
}

console.log(doNothing()); // undefined
2. Prevent Page Navigation in Links

Used in older JavaScript practices:

<a href="javascript:void(0)">Click Me</a>
Prevents the browser from navigating anywhere
Keeps the page from refreshing



3. Avoid Returning Values in Arrow Functions
const logMessage = () => void console.log("Hello");

logMessage(); // Hello
Ensures the function returns undefined
Useful when you don't want accidental returns
4. Immediately Invoked Function Expression (IIFE)
void function () {
  console.log("IIFE executed");
}();
void ensures the function is treated as an expression
