const express = require('express');
var List = require('../models/list');
const router = express.Router();
const listController = require('../controllers/list');

/* CREATE LIST ITEM */
router.post('/add', listController.addToList);

/* DELETE LIST ITEMS */
router.post('/delete', listController.deleteListItems);

/* FILTER LIST ITEMS BASED ON CATEGORY & DUE DATE */
router.post('/filter', listController.filterList);

module.exports = router;