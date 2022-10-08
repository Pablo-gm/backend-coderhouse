import { Router } from 'express';
const router = Router();

import Container from '../logic/container.js';
const carts = new Container('./data/carts.txt');
const products = new Container('./data/products.txt');

// Get all products of a cart
router.get('/:id/productos', async (req, res) => {
    if(req.params.id){
        const cart = await carts.getById(Number(req.params.id));

        if(cart == null){
            res.status(404).json({error: 'carrito no encontrado'});
        }else{
            res.json(cart.productos);
        }
    }else{
        res.json({error: "id inválido"});
    }
})

// create new cart
router.post('/', async (req, res) => {

    const newCart = {
        productos: [],
        timestamp: Date.now()
    }

    const answer = await carts.save(newCart);
    res.json(answer);
})

// add product to a cart
router.post('/:id/productos', async (req, res) => {
    const idCarrito = Number(req.params.id);
    if(idCarrito){
        let {id} = req.body;
        id = Number(id);
        const cart = await carts.getById(idCarrito);

        if(cart == null){
            res.status(404).json({error: 'carrito no encontrado'});
        }else{
            console.log(id);
            const product = await products.getById(id);

            if(product == null){
                res.status(404).json({error: 'producto no encontrado'});
            }else{
                cart.productos.push(product);
                const answer = await carts.updateById(cart);
                res.json(answer);
            }
        }
    }else{
        res.json({error: "id inválido"});
    }
})

// remove product to a cart
router.delete('/:id/productos/:id_prod', async (req, res) => {
    const idCarrito = Number(req.params.id);
    if(idCarrito){
        const id_prod = Number(req.params.id_prod);
        const cart = await carts.getById(idCarrito);

        if(cart == null){
            res.status(404).json({error: 'carrito no encontrado'});
        }else if(cart.productos.length == 0){
            res.status(404).json({error: 'el carrito no tiene productos'});
        }else{
            const tempProducts = cart.productos.filter((product) => product.id != id_prod );

            if(tempProducts.length == cart.productos.length){
                res.status(404).json({error: 'producto no encontrado'});
            }else{
                cart.productos = tempProducts;
                const answer = await carts.updateById(cart);
                res.json(answer);
            }
        }
    }else{
        res.json({error: "id inválido"});
    }
})

// delete a cart
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if(id){
        const answer = await carts.deleteById(id);
        res.json(answer);
    }else{
        res.json({error: "id inválido"});
    }

})

export default router;