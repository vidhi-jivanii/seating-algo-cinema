const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bodyParser = require('body-parser');

router.post('/login',  bodyParser.json(),authController.login);
router.post('/register', bodyParser.json(), authController.register);
router.post('/logout', authController.logout);

module.exports = router;