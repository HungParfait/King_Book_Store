const express = require('express');
const router = express.Router();

const listController = require('../app/controllers/ListController.js');

router.use('/list/:category', listController.index);

module.exports = router;