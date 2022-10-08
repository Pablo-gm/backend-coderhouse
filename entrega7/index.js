import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// require('dotenv').config()
import express from 'express';
import routerProducts from './router/products.js';
import routerCarts from './router/cart.js';

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', err => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarts);

app.use('*', (req, res) => {
   res.send({ error: -2, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada` });
});