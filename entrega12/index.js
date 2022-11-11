require('dotenv').config();
const ChatController = require('./classes/chatController');
const Products =  require('./classes/productos');

const express = require('express')
const { engine } = require('express-handlebars');
const routerApp = require("./router/router");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express()
const PORT = process.env.PORT || 8080;

const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const server = httpserver.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', () => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://localhost/test',
        mongoOptions: advancedOptions,
        collectionName: 'entrega12'
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
app.use(express.static(__dirname + '/public'));
app.use('/', routerApp);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
}));

app.set('views', './views');
app.set('view engine', 'hbs');

const productos = new Products();
productos.populateProductos();
const mensajes = new ChatController('./db/chat.txt');


io.on('connection', async socket => {

    io.sockets.emit('products', await productos.getProductos());
    io.sockets.emit('messages', await mensajes.getAll());

    socket.on('addProduct', async producto => {
        productos.addProducto(producto);
        io.sockets.emit('products', await productos.getProductos());
    })

    socket.on('addMessage', async mensaje => {
        io.sockets.emit('messages', await mensajes.addMessage(mensaje));
    })

});