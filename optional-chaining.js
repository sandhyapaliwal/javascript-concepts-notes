Optional Chaining in JavaScript (?.)
Overview

Optional chaining (?.) is a modern JavaScript feature used to safely access deeply nested object properties without causing runtime errors.

If any value in the chain is null or undefined, it returns undefined instead of throwing an error.

It is widely used in React applications and API handling.

Why Optional Chaining is Needed
Without optional chaining
const user = null;

console.log(user.name);
// ❌ Error: Cannot read property 'name' of null
With optional chaining
const user = null;

console.log(user?.name);
// ✅ undefined (no error)
Syntax
object?.property
object?.[expression]
function?.(arguments)
1. Accessing Nested Properties Safely
const user = {
    name: "Sandhya",
    address: {
        city: "Delhi"
    }
};

console.log(user?.address?.city); 
// Delhi

console.log(user?.contact?.phone); 
// undefined
2. Handling Null or Undefined Values
const user = null;

console.log(user?.name);
// undefined
3. Optional Chaining with Arrays
const users = [
    { name: "Aman" },
    { name: "Riya" }
];

console.log(users?.[0]?.name);
// Aman

console.log(users?.[5]?.name);
// undefined
4. Optional Chaining with Functions
const user = {
    greet() {
        return "Hello!";
    }
};

console.log(user?.greet?.());
// Hello

const admin = {};

console.log(admin?.greet?.());
// undefined
5. Real-World API Example
const response = {
    data: {
        user: {
            profile: {
                username: "sandhya_dev"
            }
        }
    }
};

console.log(response?.data?.user?.profile?.username);
// sandhya_dev
6. Optional Chaining vs AND (&&)
Using &&
console.log(user && user.address && user.address.city);
Using ?.
console.log(user?.address?.city);

✔ Cleaner
✔ Shorter
✔ More readable
