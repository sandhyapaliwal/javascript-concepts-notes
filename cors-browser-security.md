# CORS & Browser Security Basics in JavaScript

## 📌 Overview

When working with APIs in JavaScript, you often encounter **CORS errors**.

CORS (Cross-Origin Resource Sharing) is a **browser security feature** that restricts how resources are shared between different origins.

---

## 🌐 What is an Origin?

An **origin** is defined by three components:

- **Protocol** (http / https)
- **Domain** (example.com)
- **Port** (3000, 8080, etc.)

### Example:

```
https://example.com:3000
```

👉 Changing any of these creates a **different origin**.

### More Examples:

| URL                                | Origin                      | Notes                          |
| ---------------------------------- | --------------------------- | ------------------------------ |
| https://example.com/page           | https://example.com         | Different path, same origin    |
| https://example.com:3000           | https://example.com:3000    | Different port, different      |
| http://example.com                 | http://example.com          | Different protocol, different  |
| https://sub.example.com            | https://sub.example.com     | Different subdomain, different |

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

### Why SOP Exists:

- **Security**: Prevents malicious scripts from accessing sensitive data
- **Privacy**: Protects user data from unauthorized access
- **Data Protection**: Ensures only authorized sites can access resources

---

## 🔓 What is CORS?

CORS (Cross-Origin Resource Sharing) is a mechanism that allows servers to **relax the Same-Origin Policy**.

👉 It tells the browser:

> "This origin is allowed to access my resources"

### How CORS Works:

1. Browser makes a request to a different origin
2. Server responds with CORS headers
3. Browser checks the headers
4. If allowed → request succeeds ✅
5. If not → blocked by browser ❌

---

## 🧾 How CORS Works (Detailed Flow)

When a request is made to a different origin:

```
1. Browser sends request to server
   ↓
2. Server responds with CORS headers
   ↓
3. Browser checks if origin is allowed in headers
   ↓
4a. If allowed → JavaScript receives response
4b. If not allowed → Browser blocks response (CORS Error)
```

---

## 🧪 Important CORS Headers

### 1. Access-Control-Allow-Origin

Specifies which origins can access the resource.

```http
Access-Control-Allow-Origin: *
```

- `*` - Allows all origins (not secure)
- `https://example.com` - Allows only this origin
- `https://example.com, https://another.com` - Multiple origins

### 2. Access-Control-Allow-Methods

Specifies which HTTP methods are allowed.

```http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
```

### 3. Access-Control-Allow-Headers

Specifies which custom headers are allowed in the request.

```http
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
```

### 4. Access-Control-Allow-Credentials

Allows cookies and authentication headers to be sent with cross-origin requests.

```http
Access-Control-Allow-Credentials: true
```

👉 Required when sending cookies/auth data. Must use explicit origin (not `*`).

### 5. Access-Control-Max-Age

Specifies how long preflight results can be cached (in seconds).

```http
Access-Control-Max-Age: 3600
```

---

## ⚡ Simple vs Preflight Requests

### 🔹 Simple Request

A request is "simple" if:

- Method is GET, POST, or HEAD
- No custom headers
- Content-Type is one of: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`

**No preflight check is performed.**

### Example:

```javascript
fetch("https://api.example.com/data")
  .then(res => res.json())
  .catch(err => console.error(err));
```

---

### 🔸 Preflight Request (OPTIONS)

A request needs a preflight if:

- Method is PUT, DELETE, PATCH, etc.
- Custom headers are sent
- Content-Type is `application/json`

**Browser sends an OPTIONS request first** to check permissions.

### Example Flow:

```
Step 1: Browser sends OPTIONS request
OPTIONS /api/data
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
Origin: http://localhost:3000

Step 2: Server responds
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type

Step 3: Browser sends actual request
POST /api/data
Content-Type: application/json
```

---

## 🧪 Example Frontend Code

### Simple Fetch Request:

```javascript
fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### With Headers (Triggers Preflight):

```javascript
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
  },
  body: JSON.stringify({ name: "John" })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### With Credentials:

```javascript
fetch("https://api.example.com/data", {
  method: "GET",
  credentials: "include", // Include cookies
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(res => res.json())
  .catch(err => console.error(err));
```

---

## 🚨 Common CORS Error

```
Access to fetch at 'https://api.example.com/data'
from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
header is present on the requested resource.
```

### What This Means:

❌ The server did not allow the origin `http://localhost:3000`

---

## 🛠️ How to Fix CORS

### ✅ Backend Fix (Recommended)

#### Node.js / Express with CORS package:

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

// Allow all origins
app.use(cors());

// Or allow specific origins
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.get("/data", (req, res) => {
  res.json({ message: "Hello!" });
});

app.listen(3000);
```

#### Allow Multiple Origins:

```javascript
app.use(cors({
  origin: ["http://localhost:3000", "https://example.com"],
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));
```

#### Manual CORS Headers (without package):

```javascript
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});
```

---

### ⚠️ Frontend Fixes (Not Recommended)

These are temporary workarounds and should not be used in production:

#### 1. CORS Proxy:

```javascript
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://api.example.com/data";

fetch(proxyUrl + apiUrl)
  .then(res => res.json())
  .catch(err => console.error(err));
```

👉 Not reliable and not secure.

#### 2. JSONP (Old method):

```javascript
function handleData(data) {
  console.log(data);
}

const script = document.createElement("script");
script.src = "https://api.example.com/data?callback=handleData";
document.body.appendChild(script);
```

👉 Outdated and limited functionality.

---

## 🔐 Browser Security Concepts

### 1. Same-Origin Policy (SOP)

Restricts cross-origin access by default.

```javascript
// This is blocked by SOP
fetch("https://api.example.com/data");
```

---

### 2. CORS

Allows controlled access between origins via headers.

```javascript
// Server allows this with CORS headers
fetch("https://api.example.com/data");
```

---

### 3. Cookies & Credentials

Cookies are NOT sent by default in cross-origin requests.

```javascript
// Without credentials
fetch(url);

// With credentials (requires CORS Credentials header)
fetch(url, {
  credentials: "include"
});
```

---

### 4. HTTPS

- Secure communication
- Encrypts data in transit
- Prevents man-in-the-middle attacks

---

## ⚖️ Key Differences

| Concept | Purpose                          | Enforced By |
| ------- | -------------------------------- | ----------- |
| SOP     | Block cross-origin requests      | Browser     |
| CORS    | Allow safe cross-origin requests | Server      |

---

## 🚨 Common Interview Questions

### 1. What is CORS?

👉 CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources to be requested from another origin. It's implemented via HTTP headers sent by the server.

### 2. Why do CORS errors occur?

👉 Because the server did not include the `Access-Control-Allow-Origin` header matching the requesting origin, or other required CORS headers are missing.

### 3. How do you fix CORS?

👉 By configuring backend to send proper CORS headers like `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, etc. Use a CORS middleware (e.g., in Express) or manually set headers.

### 4. What is a preflight request?

👉 An OPTIONS request sent by the browser before the actual request to check if the server allows the origin, method, and headers.

### 5. Do CORS errors affect production?

👉 Yes. CORS is enforced by all browsers. The only exception is server-to-server requests (where CORS doesn't apply).

### 6. Can you disable CORS?

👉 CORS is a browser security feature and cannot be disabled by users. Only the server can control CORS via headers.

---

## 🧩 Key Takeaways

- CORS is a **browser security feature**, not a server error
- The browser enforces CORS, not the server
- Server must allow origins using headers
- Preflight requests ensure safe communication
- Always fix CORS from the backend
- `Access-Control-Allow-Origin` header is crucial
- Simple requests don't trigger preflight
- Credentials require explicit CORS configuration
