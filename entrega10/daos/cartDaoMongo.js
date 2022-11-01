const cartModel = require('../models/cart');
const Container = require('../containers/containerMongoDB');
const ProductsMongo = require('./productDaoMongo');

class CartsMongo extends Container {
    constructor() {
        super(cartModel);
        this.products = new ProductsMongo();
    };

    async addToCart(id, pid) {
        try {

            const productInInventory = await this.products.getById(pid);
            if (productInInventory.status === 'error') {
                return { status: 'error', message: `No hay producto con id: ${pid}` };
            }
            
            const product = { 
                id: productInInventory.data.id,
                title: productInInventory.data.title,
                description: productInInventory.data.description,
                thumbnail: productInInventory.data.thumbnail 
            }
            const cart = await this.getById(id);

            if (cart.status === 'error') {
                return { status: 'error', message: `No hay carrito con id: ${id}` };
            }

            const cartData = cart.data;

            if (cartData.products.filter(p => p.id.toString() === pid).length > 0) {
                return { status: 'error', message: `El producto ya se encuentra en el carrito.` };
            }

            const newCartProducts =  cartData.products;
            newCartProducts.push(product);

            await this.model.updateOne({ _id: id }, {$set: {products: newCartProducts}})

            return { status: 'success', message: 'Producto agregado al carrito.' };
        } catch (err) {
            return { status: 'error', message: `Error al intentar añadir producto al carrito: ${err}` };
        }
    }

    async removeFromCart(id, pid) {
        try {

            const productInInventory = await this.products.getById(pid);
            if (productInInventory.status === 'error') {
                return { status: 'error', message: `No hay producto con id: ${pid}` };
            }
            
            const cart = await this.getById(id);

            if (cart.status === 'error') {
                return { status: 'error', message: `No hay carrito con id: ${id}` };
            }

            const cartData = cart.data;
            if (cartData.products.filter(p => p.id.toString() === pid).length == 0) {
                return { status: 'error', message: `El producto no se encontraba en el carrito.` };
            }

            const newCartProducts =  cartData.products.filter(p => p.id.toString() !== pid);

            await this.model.updateOne({ _id: id }, {$set: {products: newCartProducts}})

            return { status: 'success', message: 'Producto removido del carrito.' };
        } catch (err) {
            return { status: 'error', message: `Error al intentar remover producto del carrito: ${err}` };
        }

    }

};

module.exports = CartsMongo;