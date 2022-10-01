const express = require('express')
const { engine } = require('express-handlebars');
const routerProductos = require("./router/productos");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const fs = require('fs');

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

// por si quieres borrar el archivo
// await fs.writeFile('chat.txt', "[]");

let productos = [];
let mensajes = [];
const data = fs.readFile('chat.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
    }else{
        mensajes = JSON.parse(data);
    }
});

io.on('connection', socket => {
    io.sockets.emit('products', productos);
    io.sockets.emit('messages', mensajes);

    socket.on('addProduct', producto => {
        productos.push(producto);
        io.sockets.emit('products', productos);
    })

    socket.on('addMessage', mensaje => {
        mensajes.push(mensaje);
        fs.writeFile('chat.txt', JSON.stringify(mensajes), err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
        });
        io.sockets.emit('messages', mensajes);
    })

});



