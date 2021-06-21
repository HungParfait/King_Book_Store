const express = require('express');
const router = express.Router();

const homePageController = require('../app/controllers/HomePageController.js');

router.use('/home', homePageController.index);

module.exports = router;