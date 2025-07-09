# 🛒 Node.js + Express Cart App

## 🚀 Project Description
**This project is designed to skill up and showcase QA Automation skills.**

It features a realistic web application with login, product, and cart flows, and is fully instrumented for:
- Manual QA
- Automated end-to-end testing (Cypress)
- API testing (Postman)
- Load testing (Locust)

Use this project to practice, demonstrate, or interview for QA Automation roles!

---

## 💡 Project Overview
A simple Node.js and Express web application featuring:
- User login system (with session management)
- Product listing and cart functionality (session-based, persistent via cookies)
- EJS templating and basic CSS
- Manual and automated QA support (Cypress, Postman, Locust)

---

## 🛠️ Tech Stack
- **Node.js** (backend runtime)
- **Express** (web framework)
- **EJS** (template engine)
- **express-session** (session management)
- **Cypress** (end-to-end testing)
- **Postman** (API/manual testing)
- **Locust** (load testing)

---

## 🧪 How to Run the App

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the server:**
   ```bash
   node index.js
   ```
3. **Visit in browser:**
   - [http://localhost:3000](http://localhost:3000)

---

## ✅ How to Run Cypress Tests

1. **Open Cypress UI:**
   ```bash
   npm test
   ```
   or
   ```bash
   npx cypress open
   ```
2. **Run tests:**
   - Select a test file (e.g., `cart.cy.js`, `login.cy.js`) in the Cypress UI.

---

## ⚙️ How to Run Locust Load Test

1. **Install Locust (Python required):**
   ```bash
   pip install locust
   ```
2. **Run Locust:**
   ```bash
   locust -f locustfile.py
   ```
3. **Open Locust UI:**
   - Go to [http://localhost:8089](http://localhost:8089)
   - Enter the host as `http://localhost:3000` and start the test.

---

## 🔁 How to Run Postman Collection

1. **Open Postman**
2. **Import your API endpoints** (or use the app manually)
3. **Run tests:**
   - Use the built-in test scripts (see `test-cases.md` for scenarios)
   - Example test for login failure:
     ```js
     pm.test("Login fails with invalid credentials", function () {
         pm.response.to.have.status(401);
         pm.response.text().should.include('Invalid credentials');
     });
     ```

---

## 🔐 .env Usage & Sample Test Credentials

- **No .env file is required by default.**
- If you want to move credentials or config to environment variables, create a `.env` file:
  ```env
  USER_EMAIL=user@example.com
  USER_PASSWORD=password123
  SESSION_SECRET=your-secret
  ```
- Update `index.js` to use `process.env.USER_EMAIL`, etc.

**Sample Test Credentials:**
- **Email:** `user@example.com`
- **Password:** `password123`

---

## 📋 Manual Test Cases
See [`test-cases.md`](./test-cases.md) for a full list of manual QA scenarios.

---

## 👤 Author
**Waqar Wani**  
[LinkedIn: waqar-wani-b610941a5](https://www.linkedin.com/in/waqar-wani-b610941a5/)

---

## 📞 Need help?
Open an issue or contact the maintainer for support! 