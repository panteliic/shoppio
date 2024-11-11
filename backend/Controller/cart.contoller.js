const pool = require("../db");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  try {
    let query = await pool.query(
      "SELECT * FROM cart WHERE productid = $1 AND userid = $2",
      [productId, req.user.userId]
    );

    if (query.rowCount > 0) {
      query = await pool.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE productid = $1 AND userid = $2",
        [productId, req.user.userId]
      );
      res.status(200).json({ message: "Product quantity updated in cart" });
    } else {
      query = await pool.query(
        "INSERT INTO cart (userid, productid, quantity) VALUES ($1, $2, 1)",
        [req.user.userId, productId]
      );
      res.status(201).json({ message: "Product added to cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
const updateCartItem = asyncHandler(async (req, res) => {
  const { productid, action } = req.body;
  
  try {
    const result = await pool.query(
      "SELECT * FROM cart WHERE productid = $1 AND userid = $2",
      [productid, req.user.userId]
    );

    if (result.rowCount === 0) {

      return res.status(404).json({productid: productId,userid: req.user.userId});
    }

    if (action === "increment") {
      await pool.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE productid = $1 AND userid = $2",
        [productid, req.user.userId]
      );
    } else if (action === "decrement") {
      const product = result.rows[0];
      if (product.quantity > 1) {
        await pool.query(
          "UPDATE cart SET quantity = quantity - 1 WHERE productid = $1 AND userid = $2",
          [productid, req.user.userId]
        );
      } else {
        return res.status(400).json({ message: "Quantity cannot be less than 1" });
      }
    } else if (action === "remove") {
      await pool.query(
        "DELETE FROM cart WHERE productid = $1 AND userid = $2",
        [productid, req.user.userId]
      );
    }

    res.status(200).json({ message: "Product quantity updated in cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const cart = asyncHandler(async (req,res) => { 
  try {
    const query = await pool.query(
      "select c.userid,c.productid ,price,name,image,c.quantity from cart as c inner join products as p on p.productid = c.productid WHERE userid = $1",
      [ req.user.userId]
    );
    
    res.status(200).send(query.rows)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = { addToCart, updateCartItem,cart };
