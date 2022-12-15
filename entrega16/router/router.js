const express = require('express');
const { Router } = express;
const router = Router();
const passport = require('passport');
const { login, loginUser, failLogin, signup, signupUser, failSignup, logoutUser, productsAndChat, failRoute } = require('../controllers/appController');
const checkAuthentication = require('../middlewares/auth');

// Login
router.get("", login);
router.get("/", login);
router.post("/login",passport.authenticate('login', { failureRedirect: '/faillogin' }), loginUser);
router.get('/faillogin', failLogin);

// Signup
router.get('/signup', signup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), signupUser);
router.get('/failsignup', failSignup);

// Logout
router.get("/logout", logoutUser);

// Products
router.get('/productos', checkAuthentication, productsAndChat);

// Fail route
router.get("*", failRoute);

module.exports = router;
