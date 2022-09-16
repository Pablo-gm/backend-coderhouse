const e = require('express');
const express = require('express');
const { Router } = express;
const router = Router();

const Products =  require('../classes/productos');
let myProducts = new Products();

router.get('/', (req, res) => {
    const p = myProducts.getProductos();
    res.json(p);
})

router.get('/:id', (req, res) => {
    const p = myProducts.getProducto(req.params.id);

    if(p){
        res.json(p);
    }else{
        res.status(404).json({error: 'producto no encontrado'});
    }
})

router.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body;
    const p = myProducts.addProducto(title, price, thumbnail);
    res.json(p);
})

router.put('/:id', (req, res) => {
    const {title, price, thumbnail} = req.body;
    const p = myProducts.updateProducto(req.params.id,{title, price, thumbnail});

    if(p){
        res.json({respuesta: 'Producto actualizado'});
    }else{
        res.status(404).json({error: 'producto no encontrado'});
    }
    
})

router.delete('/:id', (req, res) => {
    const p = myProducts.deleteProducto(req.params.id);

    if(p){
        res.json({respuesta: 'Producto eliminado'});
    }else{
        res.status(404).json({error: 'producto no encontrado'});
    }
    
})

module.exports = router;