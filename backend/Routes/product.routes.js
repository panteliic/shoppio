const express = require('express');
const { products } = require('../Controller/product.contoller');
const router = express.Router();

router.get("/products",products)
module.exports = router;