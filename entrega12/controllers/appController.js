const login = (req, res) => {
    return res.render("pages/login.hbs");
};

const logInUser = (req, res) => {
    const {username} = req.body;
    if(username){
        req.session.username = username;
        return res.redirect("/productos-test");
    }else{
        return res.redirect("/");
    }
};

const logOutUser = (req, res) => {
    const username = req.session.username; 
    req.session.destroy((err) => {
        if (!err) {
            res.render("pages/logout.hbs", {username});
        } else {
            res.status(404).json({error: err});
        } 
    });
};

const productsAndChat = (req, res) => {
    res.render('pages/form', {username: req.session.username});
};

module.exports = { login, logInUser, logOutUser, productsAndChat };