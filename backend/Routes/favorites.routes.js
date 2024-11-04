const express = require('express');
const { addFavoriteProduct, removeFavoriteProduct, favoriteProducts, favoriteProductIds } = require('../Controller/favorites');
const authenticateToken = require('../middleware/auth.middleware');
const router = express.Router();

router.post("/addFavoriteProduct",authenticateToken,addFavoriteProduct)
router.delete("/removeFavoriteProduct/:productId",authenticateToken, removeFavoriteProduct);
router.get("/favoriteProducts",authenticateToken, favoriteProducts);
router.get("/favoriteProductIds",authenticateToken, favoriteProductIds);

module.exports = router;