
const { Router } = require('express');
const router = Router();
const { getProducts, getProductById, addProduct, updateProduct, updateProductAndRedirect, deleteProductAndRedirect } = require('../controllers/controllerProducts');

router.get('/view/:id?', getProducts);
router.post('/view/', addProduct);

router.get('/update/:id', getProductById);
router.post('/update', updateProductAndRedirect);

router.post('/delete', deleteProductAndRedirect);

//router.put('/view/:id', updateProduct);

module.exports = router;
