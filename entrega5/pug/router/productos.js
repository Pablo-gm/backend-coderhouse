const e = require('express');
const express = require('express');
const { Router } = express;
const router = Router();

const Products =  require('../classes/productos');
let myProducts = new Products();

router.get('/', (req, res) => {
    res.render('pages/form');
})

router.get('/productos', (req, res) => {
    const productos = myProducts.getProductos();
    res.render('pages/products',{productos});
})

router.post('/productos', (req, res) => {
    const {title, price, thumbnail} = req.body;
    const p = myProducts.addProducto(title, price, thumbnail);
    res.redirect('/');
})

module.exports = router;
