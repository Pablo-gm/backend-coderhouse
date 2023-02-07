var Router = require('koa-router');
const ProductsController = require('../controllers/controllerProducts');

const productsController = new ProductsController();

var router = Router({
  prefix: '/koa/productos'
});  


//Routes will go here
router.get('/', productsController.getProductsKoa)
router.get('/:id', productsController.getProductByIdKoa)
router.post('/', productsController.addProductKoa);
router.put('/:id', productsController.updateProductKoa);
router.delete('/:id', productsController.deleteProductKoa);

module.exports = router;