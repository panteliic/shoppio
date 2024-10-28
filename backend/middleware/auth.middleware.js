const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    if (!accessToken) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    next();
  }
};

module.exports = authenticateToken;
