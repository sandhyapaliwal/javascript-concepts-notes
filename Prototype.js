# Prototype & Prototypal Inheritance in JavaScript

---

## What is a Prototype?

In JavaScript, every object has a hidden property called:

```javascript
[[Prototype]]
```

It refers to another object from which it can inherit properties and methods.

👉 This is the foundation of **Prototypal Inheritance**

---

## Accessing Prototype

You can access it using:

```javascript
let obj = {};

console.log(obj.__proto__);          // Old way
console.log(Object.getPrototypeOf(obj)); // Recommended
```

---

## Prototype Chain

When you try to access a property:

```javascript
obj.property
```

JavaScript follows this process:

```text
1. Check inside obj
2. If not found → check its prototype
3. Continue up the chain
4. Until null
```

👉 This is called the **Prototype Chain**

---

## Example — Prototype Chain

```javascript
let animal = {
  eats: true
};

let dog = {
  barks: true
};

dog.__proto__ = animal;

console.log(dog.eats);  // true (inherited)
```

✔ `dog` does not have `eats`
✔ It gets it from `animal`

---

## What is Prototypal Inheritance?

It means:

```text
Objects can inherit properties from other objects
```

No classes required (though ES6 classes use this internally)

---

## Using Object.create()

```javascript
let animal = {
  eats: true
};

let cat = Object.create(animal);

console.log(cat.eats); // true
```

✔ `cat` inherits from `animal`

---

## Constructor Functions & Prototype

```javascript
function Person(name) {
  this.name = name;
}

// Add method to prototype
Person.prototype.sayHello = function () {
  console.log("Hello, " + this.name);
};

let user1 = new Person("Sandhya");
user1.sayHello();
```

✔ Methods are shared across all instances
✔ Memory efficient

---

## How `new` Works

```javascript
let user = new Person("Sam");
```

Behind the scenes:

```text
1. Create empty object {}
2. Set prototype → Person.prototype
3. Bind this → new object
4. Return object
```

---

## `__proto__` vs `prototype`

| Feature | `__proto__`             | `prototype`               |
| ------- | ----------------------- | ------------------------- |
| Used in | All objects             | Constructor functions     |
| Purpose | Points to parent object | Used to build inheritance |
| Type    | Accessor property       | Normal property           |

---

## Method Overriding

```javascript
let animal = {
  speak() {
    console.log("Animal speaks");
  }
};

let dog = {
  speak() {
    console.log("Dog barks");
  }
};

dog.__proto__ = animal;

dog.speak(); // Dog barks
```

✔ Child method overrides parent method

---

## `this` in Prototype

```javascript
let user = {
  name: "Sandhya",
  greet() {
    console.log(this.name);
  }
};

let admin = {
  __proto__: user,
  name: "Admin"
};

admin.greet(); // Admin
```

✔ `this` refers to the calling object

---

## Built-in Prototypes

JavaScript provides built-in prototypes:

```javascript
let arr = [1, 2, 3];

console.log(arr.__proto__ === Array.prototype); // true
```

Common ones:

* `Object.prototype`
* `Array.prototype`
* `Function.prototype`
* `String.prototype`

---

## Prototype Chain Example

```javascript
let obj = {};

console.log(obj.toString());
```

Chain:

```text
obj → Object.prototype → null
```

✔ `toString()` comes from `Object.prototype`

---

## Important Notes

* All objects inherit from `Object.prototype`
* Prototype chain ends at `null`
* Avoid modifying built-in prototypes (bad practice)

---

## Example — Full Inheritance Flow

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(this.name + " is eating");
};

function Dog(name) {
  this.name = name;
}

// Inherit
Dog.prototype = Object.create(Animal.prototype);

// Fix constructor
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(this.name + " is barking");
};

let d = new Dog("Tommy");

d.eat();  // inherited
d.bark(); // own
```

---

## Key Takeaways

* Every object has a prototype
* Objects inherit using prototype chain
* `Object.create()` is clean way to inherit
* Constructor functions use `.prototype`
* Methods should be added to prototype (not inside constructor)

---

