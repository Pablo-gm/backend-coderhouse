const Container = require('./classes/container');
const { optionsMaria, optionsSQLite } = require("./db/options.js");

const express = require('express')
const { engine } = require('express-handlebars');
const routerProductos = require("./router/productos");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express()
const PORT = 8080

const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const server = httpserver.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', () => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/', routerProductos);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
}));

app.set('views', './views');
app.set('view engine', 'hbs');

const productos = new Container(optionsMaria, 'products')
const mensajes = new Container(optionsSQLite, 'messages')


io.on('connection', async socket => {

    io.sockets.emit('products', await productos.getAll());
    io.sockets.emit('messages', await mensajes.getAll());

    socket.on('addProduct', async producto => {
        productos.save(producto);
        io.sockets.emit('products', await productos.getAll());
    })

    socket.on('addMessage', async mensaje => {
        mensajes.save(mensaje);
        io.sockets.emit('messages', await mensajes.getAll());
    })

});