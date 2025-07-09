# 📬 Postman API Tests

This folder contains Postman collections and environments used to test the **Node.js Login System** API.

---

## 📦 Collection: Valid Login

This collection tests the following API routes:

| Method | Route       | Purpose                         |
|--------|-------------|---------------------------------|
| POST   | /login      | Valid login check               |
| POST   | /login      | Invalid login check             |
| GET    | /welcome    | Access welcome page with session|
| GET    | /logout     | Logout and clear session        |

---

## 🔧 How to Use

### 👉 Option 1: Run in Postman GUI

1. Open Postman.
2. Import the following files:
   - `ValidLoginCollection.json`
   - `environment.json` *(if used, contains base_url & credentials)*

3. Select the environment (if needed).
4. Run the **collection** using the **Collection Runner**.

---

### 🧪 Test Coverage

Each request in the collection contains **automated test scripts**, including:

- ✅ Status code validation (200 OK)
- ✅ Response time check (< 200ms)
- ✅ Content-Type validation (`text/html`)
- ✅ Session management via cookies
- ✅ Body content checks (where applicable)

---

### 💻 Option 2: Run from CLI using Newman (optional)

Install Newman:
```bash
npm install -g newman
