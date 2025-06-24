const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// Middleware to check auth token from cookies
const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Route: GET /auth/me
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user }); // You can send more info if needed
});

// Register + Login
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET);
  res.redirect(`http://localhost:5173/dashboard?token=${token}`); // For now
});

module.exports = router;
