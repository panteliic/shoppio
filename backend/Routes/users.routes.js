const express = require('express');
const { registerUser, loginUser, refreshAccessToken, logout, getAuthUser } = require('../Controller/user.controller');
const {authenticateToken} = require('../middleware/auth.middleware');

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/refreshAccessToken",refreshAccessToken)
router.post("/logout",logout);


module.exports = router;