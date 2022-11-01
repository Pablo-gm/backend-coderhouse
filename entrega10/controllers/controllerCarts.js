const { Products, Carts } = require('../daos/dao.js');

//Get all products or product selected by id
const getCarts = async (req, res) => {
    let carts;
    const allCarts = await Carts.getAll();
    let error;
    if(allCarts.status === 'error'){
        error = allCarts.message;
        req.flash('error', error);
    }else{
        carts = allCarts.data;
    }

	res.render('pages/carts', {carts, notifications: req.flash() } );
}

const getCartById = async (req, res) => {
	let cart;
    let products;

	if(req.params.id){
        const answer = await Carts.getById(req.params.id);
        if(answer.status === 'error'){
            req.flash('error', `No se encontró carrito con id: ${req.params.id}`);
        }else{
			cart = answer.data;
            const allProducts = await Products.getAll();
            if(allProducts.status === 'error'){
                error = allProducts.message;
                req.flash('error', error);
            }else{
                products = allProducts.data;
            }
        }
	}else{
		req.flash('error', 'El ID es requerido');
	}

	res.render('pages/updateCart', {cart , products,  notifications: req.flash() } );
}

const createCart = async (req, res) => {
    const {userId} = req.body;
    const newCart = {
        products: [],
        userId: userId
    }

    if(!userId ){
        req.flash('error', `Id de usuario es necesario.`);
    }else{
        const answer = await Carts.save(newCart);
        req.flash(answer.status, answer.message);
    }

    res.redirect('./view');
}

const deleteCartAndRedirect = async (req, res) => {
    if(req.body.id){
        const {id}  = req.body;    
        const answer = await Carts.deleteById(id);

        if(answer.status === 'success'){
            answer.message = 'Carrito eliminado.'
        }

        req.flash(answer.status, answer.message);
    }else{
        req.flash('error', "No se envió Id.");
    }

    res.redirect('../view');
}

const addProductToCartAndRedirect = async (req, res) => {
    const {id, pid} = req.body;

	if(id && pid){
        const answer = await Carts.addToCart(id,pid);
        if(answer.status === 'error'){
            req.flash('error', answer.message);
        }else{
            req.flash('success', `Producto agregado al carrito ${id}.`);
        }
	}else{
		req.flash('error', 'El ID del producto y el carrito son necesarios.');
	}
    res.redirect(`../view`);
	//res.render(pages/updateCart/${}`, {cart: cartAnswer.data , products,  notifications: req.flash() } );
}

const deleteProductFromCartAndRedirect = async (req, res) => {
    const {id, pid} = req.body;
    console.log(req.body);
	if(id && pid){
        const answer = await Carts.removeFromCart(id,pid);
        req.flash(answer.status, answer.message);
	}else{
		req.flash('error', 'El ID del producto y el carrito son necesarios.');
	}

    res.redirect(`../../view`);
}


module.exports = { getCarts, getCartById, createCart, deleteCartAndRedirect, addProductToCartAndRedirect, deleteProductFromCartAndRedirect };