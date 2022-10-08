//import express from 'express';
import { Router } from 'express';
const router = Router();

import Container from '../logic/container.js';
const products = new Container('./data/products.txt');

import {isAdmin} from '../logic/auth.js';

// Get all products or individual product by id
router.get('/:id?', async (req, res) => {
    if(req.params.id){
        const product = await products.getById(Number(req.params.id));

        if(product == null){
            res.status(404).json({error: 'producto no encontrado'});
        }else{
            res.json(product);
        }
    }else{
        const allProducts = await products.getAll();
        res.send(allProducts);
    }
})

router.post('/', isAdmin, async (req, res, next) => {

    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
    
    const newProduct = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        timestamp: Date.now()
    }

    const answer = await products.save(newProduct);
    res.json(answer);
})

router.put('/:id',isAdmin, async (req, res, next) => {
    const id = Number(req.params.id);
    if(id){
        const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
        const tempProduct = {
            id,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
        }
    
        const answer = await products.updateById(tempProduct);
        res.json(answer);
    }else{
        res.json({error: "invalid id"});
    }

})

router.delete('/:id',isAdmin, async (req, res, next) => {
    const id = Number(req.params.id);
    if(id){
        const answer = await products.deleteById(id);
        res.json(answer);
    }else{
        res.json({error: "invalid id"});
    }

})

export default router;
//module.exports = router;
