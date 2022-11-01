require('dotenv').config();
const moment = require('moment');
moment.locale('es');

const express = require('express');
//const { engine,  } = require('express-handlebars');
const expressHbs =  require('express-handlebars');
const routerProducts = require("./router/products");
const routerCarts = require("./router/carts");

const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', () => console.log(`Error: ${err}`));

app.use(session({
    secret: 'secretStore',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

/*
app.use( function(req, res, next){
    res.locals.notifications = req.flash('success');
    console.log("-------")
    console.log('method:', req.method);
    console.log('originalUrl:', req.originalUrl);
    console.log(res.locals.notifications)
    next();
});
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/productos', routerProducts);
app.use('/api/carritos', routerCarts);

app.use('*', (req, res) => {
    res.send({ error: -2, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada` });
});

const hbs = expressHbs.create({});

// register new function
hbs.handlebars.registerHelper('timeFormat', function(timeFormat, value) {
    return moment(value).format(timeFormat);
})

app.engine('hbs', expressHbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('views', './views');
app.set('view engine', 'hbs');
