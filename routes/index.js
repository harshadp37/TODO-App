const express = require('express');
var List = require('../models/list');
const router = express.Router();

/* HOME ROUTE */
router.get('/', async (req, res) => {
    try{
        let lists = [];
        let Options = {};
        let TodaysDate = new Date();
        TodaysDate.setHours(0);
        TodaysDate.setMinutes(0);
        TodaysDate.setSeconds(0);
        
        /* GET LIST ITEMS TODAY ONWARDS */
        let listWithDeadline = await List.find({$and: [{deadline: {$ne: null}}, {deadline: {$gte: TodaysDate}}]}).sort({deadline: 1});
        let listWithoutDeadline = await List.find({deadline: null});

        /* ATTACH LIST SAVING ERROR IF PASSED FROM "/list/add" */ 
        if(req.query.error){
            let key = Object.keys(req.query)[1];
            Options[key] = req.query.listSavingError;
        }

        /* SEND LIST LOADING ERROR IF LIST DOESN'T HAVE ANY ITEM */
        if(listWithDeadline.length == 0 && listWithoutDeadline.length == 0){
            Options.listLoadingError = 'Not added anything to list.';
            return res.render('home', Options);
        }

        /* ATTACH ITEMS WITHOUT DEADLINE TO END */
        lists = listWithDeadline.concat(listWithoutDeadline);
        Options.lists = lists;
        res.render('home', Options);
    }catch(e){
        console.log('something went wrong. ' + err);
        return res.render('home', { listLoadingError: 'Something went wrong while loading list.' })
    }
})

/* ROUTES FOR CREATE DELETE & FILTER */
router.use('/list', require('./list'));

module.exports = router;