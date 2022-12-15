
const logger = require('../utils/logger');

// Login
const login = (req, res) => {
    //var message = req.flash('message')
    return res.render("pages/login.hbs");
};

const loginUser = (req, res) => {
    const {username} = req.body;
    console.log(req.user);
    req.session.username = username;
    return res.redirect("/productos");
};

const failLogin = (req, res) => {
    //var message = req.flash('message')
    return res.render("pages/loginfail.hbs");
};

// Signup
const signup = (req, res) => {
    //var message = req.flash('message')
    return res.render("pages/signup.hbs");
};

const signupUser = (req, res) => {
    const {username} = req.body;
    req.session.username = username;
    return res.redirect("/productos");
};

const failSignup = (req, res) => {
    //var message = req.flash('message')
    return res.render("pages/signupfail.hbs");
};

// Logout
const logoutUser = (req, res) => {
    const username = req.session.username; 
    req.session.destroy((err) => {
        if (!err) {
            res.render("pages/logout.hbs", {username});
        } else {
            logger.error(`Route: ${req.originalUrl} Method: ${req.method} Error:${err}`);
            res.status(404).json({error: err});
        } 
    });
};

// Products
const productsAndChat = (req, res) => {
    res.render('pages/form', {username: req.session.username});
};

// Fail
const failRoute = (req, res) => {
    logger.warn(`Route: ${req.originalUrl} Method: ${req.method} Error: Ruta no implementada`);
    res.status(404).json({error: 'Ruta no implementada'});
};

module.exports = { login, loginUser, failLogin, signup, signupUser, failSignup, logoutUser, productsAndChat, failRoute };