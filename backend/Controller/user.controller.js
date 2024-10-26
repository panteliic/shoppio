const pool = require("../db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const genrateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });
};
const genarateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dana
  await pool.query(
    "INSERT INTO refresh_tokens (userid, token, expires_at) VALUES ($1, $2, $3)",
    [userId, refreshToken, expiresAt]
  );
  return refreshToken;
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    return res
      .status(400)
      .json({ message: "There is already an account with this email" });
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const userResult = await pool.query(
      "INSERT INTO users (firstname,lastname,email,password,role) VALUES ($1, $2, $3, $4,$5)",
      [firstname, lastname, email, hashPassword, "user"]
    );
    const userId = userResult.rows[0].userId;

    const accessToken = genrateAccessToken(userId);
    const refreshToken = await genarateRefreshToken(userId);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({message:"User created"},{status:201});

    res.status(200).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "User not created", err });
    console.log(err);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  try{
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = userResult.rows[0];
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const accessToken = genrateAccessToken(user.userid);
    const refreshToken = await genarateRefreshToken(user.userid);
    
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "User logged in" });
    
  }catch(err) {
    res.status(401).json({ error: "Unautorized", err });

  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401).send("Unautorized");

  const tokenResult = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token = $1",
    [refreshToken]
  );
  const token = tokenResult.rows[0];

  if (!token) return res.sendStatus(403).sendStatus("Forbidden");

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = genrateAccessToken(user.userId);
    
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });
  });
});
const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
      refreshToken,
    ]);
    res.clearCookie("refreshToken");
  }

  res.sendStatus(204);
});
module.exports = { registerUser, loginUser,refreshAccessToken, logout };
