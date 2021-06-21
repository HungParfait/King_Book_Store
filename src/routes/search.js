const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchController.js');

router.use('/search/result', searchController.index);

module.exports = router;