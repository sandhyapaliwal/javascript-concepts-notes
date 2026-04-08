# CORS & Browser Security Basics in JavaScript

## 📌 Overview

When working with APIs in JavaScript, you often encounter **CORS errors**.

CORS (Cross-Origin Resource Sharing) is a **browser security feature** that restricts how resources are shared between different origins.

---

## 🌐 What is an Origin?

An **origin** is defined by:

* Protocol (http / https)
* Domain (example.com)
* Port (3000, 8080, etc.)

### Example:

```
https://example.com:3000
```

👉 Changing any of these creates a **different origin**

---

## 🚫 Same-Origin Policy (SOP)

The **Same-Origin Policy** is a security rule that:

👉 Prevents a website from making requests to a different origin

### Example:

```
Frontend → http://localhost:3000
Backend → http://api.example.com
```

❌ Request blocked because origins are different

---

## 🔓 What is CORS?

CORS is a mechanism that allows servers to **relax the Same-Origin Policy**

👉 It tells the browser:

> “This origin is allowed to access my resources”

---

## 🧾 How CORS Works

When a request is made:

1. Browser sends request to server
2. Server responds with headers
3. Browser checks headers
4. If allowed → request succeeds
   If not → blocked by browser

---

## 🧪 Important CORS Headers

### 1. Access-Control-Allow-Origin

```http id="3o2h3z"
Access-Control-Allow-Origin: *
```

👉 Allows all origins

---

### 2. Access-Control-Allow-Methods

```http id="s5z2hk"
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

---

### 3. Access-Control-Allow-Headers

```http id="q9z0bz"
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

### 4. Access-Control-Allow-Credentials

```http id="u6m3px"
Access-Control-Allow-Credentials: true
```

👉 Required when sending cookies/auth data

---

## ⚡ Simple vs Preflight Requests

### 🔹 Simple Request

* GET / POST
* No custom headers
* No preflight check

---

### 🔸 Preflight Request (OPTIONS)

Browser sends an **OPTIONS request first** to check permissions.

### Example Flow:

```
OPTIONS /api/data
→ Server responds with allowed methods

Then:
GET /api/data
```

---

## 🧪 Example (Frontend)

```javascript id="4kq9xv"
fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

👉 If server does not allow origin → CORS error

---

## 🚨 Common CORS Error

```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000'
has been blocked by CORS policy
```

---

## 🛠️ How to Fix CORS

### ✅ Backend Fix (Recommended)

Example (Node.js / Express):

```javascript id="j9p3ka"
const cors = require("cors");
app.use(cors());
```

---

### ✅ Allow Specific Origin

```javascript id="z0n7xr"
app.use(cors({
  origin: "http://localhost:3000"
}));
```

---

### ⚠️ Frontend Fix (Not Recommended)

* Using proxy
* Disabling browser security

👉 These are temporary solutions only

---

## 🔐 Browser Security Concepts

### 1. Same-Origin Policy (SOP)

Restricts cross-origin access

---

### 2. CORS

Allows controlled access between origins

---

### 3. Cookies & Credentials

* Cookies are not sent by default in cross-origin requests
* Need:

```javascript id="m3p9yt"
fetch(url, {
  credentials: "include"
});
```

---

### 4. HTTPS

* Secure communication
* Prevents data interception

---

## ⚖️ Key Differences

| Concept | Purpose                          |
| ------- | -------------------------------- |
| SOP     | Block cross-origin requests      |
| CORS    | Allow safe cross-origin requests |

---

## 🚨 Common Interview Questions

### 1. What is CORS?

👉 A mechanism that allows restricted resources to be requested from another origin

---

### 2. Why do CORS errors occur?

👉 Because the server does not allow the requesting origin

---

### 3. How do you fix CORS?

👉 By configuring backend headers

---

### 4. What is a preflight request?

👉 An OPTIONS request sent before the actual request

---

## 🧩 Key Takeaways

* CORS is enforced by the browser (not the server)
* Server must allow origins using headers
* Preflight requests ensure safe communication
* Always fix CORS from backend

