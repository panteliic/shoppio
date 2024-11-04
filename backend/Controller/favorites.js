const pool = require("../db");
const asyncHandler = require("express-async-handler");

const addFavoriteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  try {
    const query = await pool.query(
      "INSERT INTO favorites (userId, productId) VALUES ($1,$2)",
      [req.user.userId, productId]
    );
    res.status(201).json(query.rows[0]);
  } catch (err) {
    res.status(500);
  }
});
const removeFavoriteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM favorites WHERE userId = $1 AND productId = $2",
      [req.user.userId, productId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (err) {
    console.error("Error removing favorite product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const favoriteProducts = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      `select "name", image, price, f.productid as productid
      from products as p 
      inner join favorites as f on p.productId = f.productid
      where f.userid = $1`,
      [req.user.userId]
    );

    res.status(200).send(result.rows);
  } catch (err) {
    console.error("Error removing favorite product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const favoriteProductIds = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      `select productid
      from  favorites
      where userid = $1`,
      [req.user.userId]
    );

    res.status(200).send(result.rows);
  } catch (err) {
    console.error("Error removing favorite product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = {
  addFavoriteProduct,
  removeFavoriteProduct,
  favoriteProducts,
  favoriteProductIds
};
