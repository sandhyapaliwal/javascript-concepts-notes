/*
===========================================
OBJECTS + "this" IN JAVASCRIPT
===========================================

📌 Definition:

1. Object:
   JavaScript mein object ek collection hota hai key-value pairs ka.
   Har key ko property kehte hain aur value koi bhi data type ho sakta hai.

2. "this":
   "this" keyword current object ko refer karta hai jiske andar function call ho raha hai.

   👉 Simple words:
   "this" = jis object ne function call kiya

===========================================
BASIC OBJECT EXAMPLE
===========================================
*/

const person = {
  name: "Sandhya",
  age: 22,

  // method (function inside object)
  greet: function () {
    console.log("Hello, my name is " + this.name);
  }
};

person.greet(); // Output: Hello, my name is Sandhya


/*
===========================================
WHY "this" IS USED?
===========================================

Agar hum directly name likhen:
*/

const user = {
  name: "Rahul",

  greet: function () {
    console.log("Hello " + name); // ❌ ERROR
  }
};

// user.greet();  // Uncomment karoge toh error aayega

/*
✔ Correct way:
*/

const user2 = {
  name: "Rahul",

  greet: function () {
    console.log("Hello " + this.name); // ✅
  }
};

user2.greet(); // Output: Hello Rahul


/*
===========================================
"this" DEPENDS ON HOW FUNCTION IS CALLED
===========================================
*/

const obj1 = {
  name: "Object1",
  show: function () {
    console.log(this.name);
  }
};

const obj2 = {
  name: "Object2"
};

obj2.show = obj1.show;

obj1.show(); // Output: Object1
obj2.show(); // Output: Object2

/*
👉 Same function hai, but jis object se call ho raha hai,
   "this" usi ko refer karega.
*/


/*
===========================================
"this" IN ARROW FUNCTION ⚠️ IMPORTANT
===========================================
*/

const arrowObj = {
  name: "Sandhya",

  greet: () => {
    console.log(this.name);
  }
};

arrowObj.greet(); // Output: undefined

/*
❗ Reason:
Arrow function apna "this" create nahi karta.
Wo parent scope ka "this" use karta hai.

👉 Isliye object methods ke liye arrow function avoid karo.
*/


/*
===========================================
CORRECT WAY (USE NORMAL FUNCTION)
===========================================
*/

const correctObj = {
  name: "Sandhya",

  greet: function () {
    console.log(this.name);
  }
};

correctObj.greet(); // Output: Sandhya


/*
===========================================
"this" IN GLOBAL SCOPE
===========================================
*/

console.log(this);

/*
Browser mein:
👉 window object

Node.js mein:
👉 empty object {}
*/


/*
===========================================
INTERVIEW QUICK POINTS 🚀
===========================================

1. "this" depends on function call, not where it is written
2. Object method → "this" = object
3. Arrow function → no own "this"
4. Normal function → has its own "this"
5. "this" can change dynamically

===========================================
END
===========================================
*/
