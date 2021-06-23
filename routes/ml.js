const { Router } = require('express');

const { search, getProduct } = require('./../controllers/ml');

const router = Router();

router.get('/search', [], search);

router.get('/product/:product_id', [], getProduct);

module.exports = router;
