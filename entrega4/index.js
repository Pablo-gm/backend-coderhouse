const routerProductos = require("./router/productos")

const express = require('express')
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', err => console.log(`Error: ${err}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/productos', routerProductos);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});