const Contenedor = require('./contenedor');
const express = require('express')

const archivo = new Contenedor('productos.txt');

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', async (req, res) => {
    const productos = await archivo.getAll();
    res.send(productos);
})
 

app.get('/productoRandom', async (req, res) => {
    const productos = await archivo.getAll();
    const random = Math.floor(Math.random()*(productos.length)); 
    const productoRandom = productos[random];
    res.send(productoRandom);
})
