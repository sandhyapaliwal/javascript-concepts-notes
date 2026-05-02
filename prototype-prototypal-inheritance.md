# Prototype & Prototypal Inheritance in JavaScript

## 📌 Overview

In JavaScript, every object has a hidden property called:

```javascript
[[Prototype]]
```

It refers to another object from which it can inherit properties and methods.

👉 This is the foundation of **Prototypal Inheritance**

---

## 🔍 What is a Prototype?

A **prototype** is a blueprint object from which other objects can inherit properties and methods.

```javascript
let obj = {};

console.log(obj.__proto__);                    // Old way (works)
console.log(Object.getPrototypeOf(obj));      // Recommended way
```

---

## 🔗 Prototype Chain

When you try to access a property:

```javascript
obj.property
```

JavaScript follows this process:

```text
1. Check inside obj
   ↓
2. If not found → check obj's prototype
   ↓
3. Continue up the chain
   ↓
4. Until null (end of chain)
```

👉 This is called the **Prototype Chain**

---

## 🧪 Example — Prototype Chain

```javascript
let animal = {
  eats: true,
  sound: "Some sound"
};

let dog = {
  barks: true
};

dog.__proto__ = animal;  // Set animal as prototype

console.log(dog.eats);   // true (inherited)
console.log(dog.barks);  // true (own property)
console.log(dog.sound);  // "Some sound" (inherited)
```

✔ `dog` does not have `eats` or `sound` properties
✔ It gets them from `animal` through the prototype chain

---

## 🎯 What is Prototypal Inheritance?

It means:

```text
Objects can inherit properties and methods from other objects
```

No classes required (though ES6 classes use prototypal inheritance internally)

---

## 📦 Using Object.create()

The recommended way to create an object with a specific prototype:

```javascript
let animal = {
  eats: true,
  describe: function() {
    return "I am an animal";
  }
};

let cat = Object.create(animal);

console.log(cat.eats);        // true (inherited)
console.log(cat.describe()); // "I am an animal"

// cat has its own properties
cat.name = "Whiskers";
console.log(cat.name);       // "Whiskers"
```

✔ `cat` inherits from `animal`
✔ `cat` can have its own properties too

---

## 🏗️ Constructor Functions & Prototype

This is how JavaScript did inheritance before ES6 classes:

```javascript
function Person(name) {
  this.name = name;
}

// Add method to prototype (shared across all instances)
Person.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

// Add another method
Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

let user1 = new Person("Sandhya");
let user2 = new Person("Rahul");

user1.sayHello();     // "Hello, my name is Sandhya"
user2.sayHello();     // "Hello, my name is Rahul"
user1.greet();        // "Hi, I'm Sandhya"
```

✔ Methods are shared across all instances (memory efficient)
✔ Each instance has its own properties

---

## 🔨 How `new` Keyword Works

When you call:

```javascript
let user = new Person("Sam");
```

Behind the scenes, JavaScript does:

```javascript
// Step 1: Create empty object
let obj = {};

// Step 2: Set prototype (link to constructor's prototype)
obj.__proto__ = Person.prototype;

// Step 3: Call constructor with obj as 'this'
Person.call(obj, "Sam");

// Step 4: Return the object
return obj;
```

So the `new` keyword does this automatically!

---

## 📊 `__proto__` vs `prototype`

| Feature | `__proto__` | `prototype` |
| ------- | ----------- | ----------- |
| Used in | All objects | Constructor functions |
| Purpose | Points to parent object | Used to build inheritance |
| Type | Accessor property | Normal property |
| Access | `obj.__proto__` | `ConstructorFunc.prototype` |

### Visual:

```javascript
function Animal(name) {
  this.name = name;
}

const dog = new Animal("Buddy");

// dog.__proto__ === Animal.prototype
// Animal.prototype.__proto__ === Object.prototype
// Object.prototype.__proto__ === null
```

---

## 🎭 Method Overriding

Child object can override parent methods:

```javascript
let animal = {
  speak() {
    console.log("Generic animal sound");
  }
};

let dog = Object.create(animal);

dog.speak = function() {  // Override
  console.log("Woof! Woof!");
};

dog.speak();           // "Woof! Woof!" (child method)
animal.speak();        // "Generic animal sound" (parent method)
```

✔ Child method overrides parent method
✔ Parent method still accessible

---

## 🎯 `this` in Prototype Methods

`this` always refers to the **calling object**, not the prototype:

```javascript
let user = {
  name: "Sandhya",
  greet() {
    console.log("Hello, " + this.name);
  }
};

let admin = Object.create(user);
admin.name = "Admin";

admin.greet();  // "Hello, Admin" (this = admin)
user.greet();   // "Hello, Sandhya" (this = user)
```

✔ `this` refers to the object that calls the method

---

## 🏛️ Built-in Prototypes

JavaScript provides built-in prototypes:

```javascript
// Arrays
let arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype);        // true

// Strings
let str = "hello";
console.log(str.__proto__ === String.prototype);       // true

// Objects
let obj = {};
console.log(obj.__proto__ === Object.prototype);       // true
```

### Common Built-in Prototypes:

- `Object.prototype` - Base of all objects
- `Array.prototype` - Methods like `map`, `filter`, `find`
- `String.prototype` - Methods like `toUpperCase`, `slice`
- `Function.prototype` - Methods like `call`, `apply`, `bind`

---

## 🔗 Prototype Chain Example

```javascript
let obj = {};

console.log(obj.toString());
```

**Lookup chain:**

```
obj → Object.prototype.toString() → Found!
```

```javascript
let arr = [1, 2, 3];

console.log(arr.length);  // 3
```

**Lookup chain:**

```
arr → Array.prototype.length → Found!
(if not, would go to Object.prototype)
```

---

## ⚠️ Important Notes

1. **All objects inherit from `Object.prototype`**

```javascript
let obj = {};
let arr = [];
let func = function() {};

// All have Object.prototype in chain
console.log(Object.prototype.toString); // Available to all
```

2. **Prototype chain ends at `null`**

```javascript
let obj = {};
console.log(obj.__proto__.__proto__);  // Object.prototype
console.log(Object.prototype.__proto__); // null (END)
```

3. **Don't modify built-in prototypes (bad practice!)**

```javascript
// ❌ AVOID THIS!
Array.prototype.customMethod = function() {
  return "Bad practice!";
};

// ✅ DO THIS INSTEAD
class MyArray extends Array {
  customMethod() {
    return "Better approach!";
  }
}
```

---

## 📚 Full Inheritance Example

### Problem: We need Dog to inherit from Animal

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(this.name + " is eating");
};

function Dog(name) {
  Animal.call(this, name);  // Call parent constructor
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);

// Fix constructor reference
Dog.prototype.constructor = Dog;

// Add Dog-specific method
Dog.prototype.bark = function () {
  console.log(this.name + " is barking");
};

let d = new Dog("Tommy");

d.eat();   // "Tommy is eating" (inherited)
d.bark();  // "Tommy is barking" (own method)
```

✔ Dog inherits from Animal
✔ Dog has its own methods
✔ `this` refers correctly

---

## 🔄 Modern ES6 Classes (Uses Prototypal Inheritance)

ES6 classes are syntactic sugar over prototypal inheritance:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + " is eating");
  }
}

class Dog extends Animal {
  bark() {
    console.log(this.name + " is barking");
  }
}

const dog = new Dog("Buddy");
dog.eat();   // "Buddy is eating"
dog.bark();  // "Buddy is barking"
```

✔ Cleaner syntax
✔ Same prototypal inheritance underneath

---

## 🚨 Common Interview Questions

### Q1: What is a prototype?
👉 An object from which other objects inherit properties and methods.

### Q2: Explain the prototype chain?
👉 When accessing a property, JavaScript searches: object → prototype → prototype's prototype → ... → null

### Q3: What is prototypal inheritance?
👉 Objects can inherit from other objects through the prototype chain.

### Q4: What does `new` do?
👉 Creates empty object, sets prototype, calls constructor, returns object.

### Q5: Difference between `__proto__` and `prototype`?
👉 `__proto__` is property of all objects, `prototype` is property of constructor functions.

### Q6: How to create inheritance?
👉 Use `Object.create()` or constructor functions with `new`.

### Q7: What is method overriding?
👉 Child object provides its own version of a parent method.

### Q8: Should you modify built-in prototypes?
👉 No, it's a bad practice and can cause conflicts.

---

## 🧩 Key Takeaways

- Every object has a `__proto__` (hidden property)
- **Prototype Chain**: Objects inherit through a chain of prototypes
- **`Object.create()`**: Recommended way to set up inheritance
- **Constructor Functions**: Use `new` to create instances
- **`this`**: Always refers to the calling object
- **Built-in Prototypes**: All objects inherit from `Object.prototype`
- **Don't modify**: Never modify built-in prototypes
- **ES6 Classes**: Modern syntax for prototypal inheritance

---

## 🎓 Best Practices

- [ ] Use `Object.create()` for simple inheritance
- [ ] Use ES6 `class` for modern JavaScript
- [ ] Understand prototype chain for debugging
- [ ] Don't modify built-in prototypes
- [ ] Remember `this` refers to calling object
- [ ] Use `instanceof` to check prototype chain
- [ ] Understand `constructor` property
- [ ] Know difference between instance and prototype properties

---

**Happy Coding! 🚀**

Remember: Prototypal inheritance is at the heart of JavaScript. Understanding it deeply will make you a better developer!
