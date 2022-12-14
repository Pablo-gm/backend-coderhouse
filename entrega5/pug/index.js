const express = require('express')
const routerProductos = require("./router/productos");

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', err => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/', routerProductos);

app.set('views', './views');
app.set('view engine', 'pug');