# Manual Test Cases for Node.js + Express Cart App

## ✅ Login Page

| Test Case ID | Description                  | Steps                                                        | Expected Result                                 | Status |
| ------------ | ----------------------------| ------------------------------------------------------------ | ----------------------------------------------- | ------ |
| TC001        | Verify login page loads      | Open `/`                                                     | Email, password, login button visible           | Pass   |
| TC002        | Invalid email format         | Enter `abc.com` as email, valid password                     | Show email format error                         | Pass   |
| TC003        | Valid login                 | Use `user@example.com` and `password123`                     | Redirect to `/welcome`                          | Pass   |
| TC004        | Wrong password              | Valid email, wrong password                                  | Show error message: "Invalid credentials."     | Pass   |
| TC005        | Empty password              | Leave password empty                                         | Show error message: "Email and password are required." | Pass   |
| TC006        | Empty email                 | Leave email empty, valid password                            | Show error message: "Email and password are required." | Pass   |
| TC007        | Logout clears session        | Login, click Logout                                          | Redirect to `/`, session cleared, cart saved to cookie | Pass   |

## ✅ Product Page

| Test Case ID | Description           | Steps                                         | Expected Result                        | Status |
| ------------ | ---------------------| ---------------------------------------------- | -------------------------------------- | ------ |
| TC008        | Load product list     | Login → go to `/products`                     | 5 products listed with name, desc, price, Add to Cart | Pass   |
| TC009        | Add to cart (AJAX)   | Click “Add to Cart” on any product            | Message: "Added to cart! (N items)", cart count increases | Pass   |
| TC010        | Add multiple items    | Add several products to cart                  | All appear in cart, cart count updates | Pass   |

## ✅ Cart Page

| Test Case ID | Description           | Steps                                         | Expected Result                        | Status |
| ------------ | ---------------------| ---------------------------------------------- | -------------------------------------- | ------ |
| TC011        | View cart items      | Login → `/cart`                               | See all added products with details    | Pass   |
| TC012        | Remove item          | Click “Remove” next to item                   | Item removed from cart, cart updates   | Pass   |
| TC013        | Cart total           | Add products, view `/cart`                    | Total price equals sum of product prices | Pass   |
| TC014        | Cart persists logout | Add to cart, logout, login again              | Cart restored with previous items      | Pass   |
| TC015        | Cart empty state     | Remove all items, view `/cart`                | “Your cart is empty” message shown     | Pass   |

## ✅ Security & Access

| Test Case ID | Description           | Steps                                         | Expected Result                        | Status |
| ------------ | ---------------------| ---------------------------------------------- | -------------------------------------- | ------ |
| TC016        | Protected routes     | Try `/products`, `/cart`, `/welcome` logged out| Redirected to `/` (login page)         | Pass   |
| TC017        | Session hijack       | Login, copy session cookie, logout, reuse cookie| Should not access protected pages      | Pass   |

---

**Note:** All test cases have been executed and passed as per the current implementation. Update the "Status" column as you test new features or edge cases. 