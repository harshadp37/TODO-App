const express = require('express');
var List = require('../models/list');
const router = express.Router();
const listController = require('../controllers/list');

router.post('/add', listController.addToList);

router.post('/delete', listController.deleteListItems);

router.post('/filter', listController.filterList);

module.exports = router;