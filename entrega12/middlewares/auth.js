const isLogged = (req, res, next) => {
    //console.log(req.session.username);
    if (req.session.username) {
        next();
    } else {
        res.render("pages/login.hbs");
    }
}

module.exports = isLogged;