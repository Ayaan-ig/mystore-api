const express = require('express');

const router = express.Router();

const {getAllProducts,getSingleProduct,deleteProduct,updateQuantity, createProduct} = require('../controllers/products')

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:productId').get(getSingleProduct).patch(updateQuantity).delete(deleteProduct);

module.exports = router;