const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const { addToCart, updateCartItem,cart } = require('../Controller/cart.contoller');
const router = express.Router();

router.post("/addToCart",authenticateToken,addToCart)
router.put("/updateCartItem",authenticateToken,updateCartItem)
router.get("/cart",authenticateToken,cart)

module.exports = router