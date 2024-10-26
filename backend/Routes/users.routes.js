const express = require('express');
const { registerUser, loginUser, refreshAccessToken, logout } = require('../Controller/user.controller');

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/refreshAccessToken",refreshAccessToken)
router.post("/logout",logout)

module.exports = router;