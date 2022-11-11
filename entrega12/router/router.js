const express = require('express');
const { Router } = express;
const router = Router();
const { login, logInUser, logOutUser, productsAndChat } = require('../controllers/appController');
const isLogged = require('../middlewares/auth');

router.get("/", login);
router.post("/login", logInUser);
router.get("/logout", logOutUser);
router.get('/productos-test', isLogged, productsAndChat);

module.exports = router;
