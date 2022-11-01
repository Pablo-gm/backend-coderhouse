const { Products } = require('../daos/dao.js');

//Get all products or product selected by id
const getProducts = async (req, res) => {
    let products;
    let error;
    if(req.params.id){
        const product = await Products.getById(req.params.id);
        if(product.status === 'error'){
            //res.status(404).json({status: 'error', message: 'Producto no encontrado'});
            req.flash('error', `No se encontró producto con id: ${req.params.id}`);
            error = product.message;
        }else{
            //res.json(product);
            products = product.data;
        }
    }else{
        //return res.json(await Products.getAll());
        const allProducts = await Products.getAll();
        if(allProducts.status === 'error'){
            error = allProducts.message;
            req.flash('error', error);
        }else{
            products = allProducts.data;
        }
    }

    res.render('pages/products', {products, notifications: req.flash() } );
    //res.render('pages/products', {products , error } );
}

const getProductById = async (req, res) => {
	let product;

	if(req.params.id){
        const answer = await Products.getById(req.params.id);
        if(answer.status === 'error'){
            req.flash('error', `No se encontró producto con id: ${req.params.id}`);
        }else{
			product = answer.data;
        }
	}else{
		req.flash('error', 'El ID es requerido');
	}

	res.render('pages/updateProduct', {product , notifications: req.flash() } );
}

const addProduct = async (req, res) => {
    const {title, price, thumbnail, description, stock} = req.body;
    
    const newProduct = {
        title,
        price,
        thumbnail,
        description,
        stock,
		code: `CODE_${Date.now()}`,
        timestamp: Date.now()
    }
	// maybe validate no parameter is missing?
    if(!title || !price || !thumbnail || !description || !stock){
        req.flash('error', `Todos los campos son necesarios para agregar un producto.`);
    }else{
        const answer = await Products.save(newProduct);
        req.flash(answer.status, answer.message);
    }

    res.redirect('./view');
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    if(id){
        const {title, price, thumbnail, description, stock}  = req.body;
        const tempProduct = {
            title,
            price,
            thumbnail,
            description,
            stock,
        }
    
        const answer = await Products.update(id, tempProduct);
        res.json(answer);
    }else{
        res.json({error: "No se envió Id."});
    }

}

const updateProductAndRedirect = async (req, res) => {
    console.log(req.body);
    if(req.body.id){
        const {id, title, price, thumbnail, description, stock}  = req.body;
        const tempProduct = {
            title,
            price,
            thumbnail,
            description,
            stock,
        }
    
        // maybe validate no parameter is missing?
        if(!title || !price || !thumbnail || !description || !stock){
            req.flash('error', `Todos los campos son necesarios para actualizar un producto.`);
        }else{
            const answer = await Products.update(id, tempProduct);
            if(answer.status === 'success'){
                answer.message = 'Producto actualizado.'
            }
            req.flash(answer.status, answer.message);
        }
    }else{
        //res.json({error: "No se envió Id."});
        req.flash('error', "No se envió Id.");
    }

    res.redirect('../view');
}

const deleteProductAndRedirect = async (req, res) => {
    if(req.body.id){
        const {id}  = req.body;    
        const answer = await Products.deleteById(id);

        if(answer.status === 'success'){
            answer.message = 'Producto eliminado.'
        }

        req.flash(answer.status, answer.message);
    }else{
        //res.json({error: "No se envió Id."});
        req.flash('error', "No se envió Id.");
    }

    res.redirect('../view');
}


module.exports = { getProducts, getProductById, addProduct, updateProduct, updateProductAndRedirect, deleteProductAndRedirect };