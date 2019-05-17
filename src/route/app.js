const express = require('express');

const userController = require('../controller/user.controller');
const tokenVerifier = require('../middleware/tokenVerifier.middleware');
const router = express.Router();

router.get('/getAllUsers',userController.getAll);
router.post('/signUp',userController.signUp);
router.post('/login',userController.login)

module.exports = router;