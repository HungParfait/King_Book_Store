const express = require('express');
const router = express.Router();

const pageController = require('../app/controllers/PageController.js');

router.use('/search/result/page', pageController.index);

module.exports = router;