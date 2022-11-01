const { Router } = require('express');
const router = Router();
const { getCarts, getCartById, createCart, deleteCartAndRedirect, addProductToCartAndRedirect, deleteProductFromCartAndRedirect } = require('../controllers/controllerCarts');

router.get('/view', getCarts);
router.post('/view/', createCart);

router.get('/update/:id', getCartById);
router.post('/update', addProductToCartAndRedirect);
router.post('/update/delete', deleteProductFromCartAndRedirect);


router.post('/delete', deleteCartAndRedirect);

module.exports = router;