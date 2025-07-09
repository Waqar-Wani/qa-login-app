const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/');
}

// Restore cart from cookie if user is logged in and session cart is not set
app.use((req, res, next) => {
  if (req.session.user && !req.session.cart && req.cookies.cart) {
    try {
      req.session.cart = JSON.parse(req.cookies.cart);
    } catch (e) {
      req.session.cart = [];
    }
  }
  next();
});

// Dummy credentials
const USER = { email: 'user@example.com', password: 'password123' };

// Static product list
const PRODUCTS = [
  { id: 1, name: 'Product A', description: 'Description for product A', price: 10 },
  { id: 2, name: 'Product B', description: 'Description for product B', price: 20 },
  { id: 3, name: 'Product C', description: 'Description for product C', price: 30 },
  { id: 4, name: 'Product D', description: 'Description for product D', price: 40 },
  { id: 5, name: 'Product E', description: 'Description for product E', price: 50 }
];

// Routes
app.get('/', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password }); // 🪵 Log login attempts

  if (!email || !password) {
    return res.render('login', { error: 'Email and password are required.' });
  }
  // Simple email format validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    return res.render('login', { error: 'Invalid email format.' });
  }
  if (email === USER.email && password === USER.password) {
    console.log('✅ Valid login');
    req.session.user = email;
    // Restore cart from cookie if exists
    if (req.cookies.cart) {
      try {
        req.session.cart = JSON.parse(req.cookies.cart);
      } catch (e) {
        req.session.cart = [];
      }
      // Clear the cart cookie after restoring
      res.clearCookie('cart');
    }
    return res.redirect('/welcome');
  } else {
    console.log('❌ Invalid login — rendering error');
    return res.status(401).render('login', { error: 'Invalid credentials' });
  }
  app.use(express.urlencoded({ extended: true }));

});

app.get('/welcome', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.render('welcome', { email: req.session.user });
});

app.get('/logout', (req, res) => {
  // Save cart to cookie before destroying session
  const cart = req.session.cart || [];
  res.cookie('cart', JSON.stringify(cart), { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 1 week
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Replace with your actual user check logic
  if (email === "user@example.com" && password === "password123") {
    return res.json({ status: "success", message: "Login successful" });
  } else {
    return res.status(401).json({ status: "fail", message: "Invalid credentials" });
  }
});

// Products page (protected)
app.get('/products', isAuthenticated, (req, res) => {
  res.render('products', { products: PRODUCTS });
});

// Add to cart (AJAX, protected)
app.post('/add-to-cart', isAuthenticated, (req, res) => {
  console.log('add-to-cart req.body:', req.body);
  const productId = req.body.productId;
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product) {
    console.log('Product not found for id:', productId);
    return res.status(400).json({ success: false, message: 'Product not found' });
  }
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push(product);
  // Update the cart cookie to keep it in sync
  res.cookie('cart', JSON.stringify(req.session.cart), { maxAge: 7 * 24 * 60 * 60 * 1000 });
  console.log('Cart after add:', req.session.cart);
  res.json({ success: true, cartCount: req.session.cart.length });
});

// Cart page (protected)
app.get('/cart', isAuthenticated, (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render('cart', { cart, total });
});

// Remove from cart (protected)
app.post('/remove-from-cart', isAuthenticated, (req, res) => {
  const { index } = req.body;
  if (req.session.cart && req.session.cart.length > index) {
    req.session.cart.splice(index, 1);
    // Update the cart cookie to keep it in sync
    res.cookie('cart', JSON.stringify(req.session.cart), { maxAge: 7 * 24 * 60 * 60 * 1000 });
  }
  res.redirect('/cart');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});