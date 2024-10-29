const pool = require("../db");
const asyncHandler = require("express-async-handler");

const products = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = { products };
