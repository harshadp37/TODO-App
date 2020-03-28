var List = require('../models/list');

/* TO CREATE LIST ITEM */
module.exports.addToList = (req, res) => {

    /* CREATE LIST ONLY IF TITLE IS PROVIDED ELSE PASS LIST SAVING ERROR TO HOME ROUTE */
    if (req.body.title) {
        
        /* SET DEADLINE TIME TO END OF THE DAY */
        if(req.body.deadline){
            req.body.deadline = new Date(req.body.deadline);
            req.body.deadline.setHours(23);
            req.body.deadline.setMinutes(59);
            req.body.deadline.setSeconds(59);
        }
        var list = new List({
            title: req.body.title,
            category: req.body.category ? req.body.category : '',
            deadline: req.body.deadline ? req.body.deadline : ''
        });
        list.save((err) => {
            if (err) {
                console.log('something went wrong.');
                return res.redirect('/?error=true&listSavingError=Something went wrong while saving list.')
            }
            return res.redirect('/');
        })
    }else{
        return res.redirect('/?error=true&listSavingError=Please Provide Something in Description.')
    }
}

/* TO DELETE LIST ITEMS */
module.exports.deleteListItems = (req, res) => {
    List.deleteMany({_id: req.body.listItem}, (err)=>{
        if(err){
            console.log('something went wrong.');
        }
        return res.redirect('/')
    })
}

/* TO FILTER LIST ITEMS BASED ON CATEGORY & DUE DATE */
module.exports.filterList = async (req, res) => {
    try{
        let Options = {};
        
        if(req.body.filterDeadline || req.body.filterCategory){
            let filterQuery = {};
            let filterLists = [];
            /* FILTER BASED ON DEADLINE & CATEGORY */
            if(req.body.filterDeadline && req.body.filterCategory){
                Options.filterDeadline = req.body.filterDeadline;
                Options.filterCategory = req.body.filterCategory;
                let filterDeadline = new Date(req.body.filterDeadline);
                filterDeadline.setHours(23);
                filterDeadline.setMinutes(59);
                filterDeadline.setSeconds(59);
                filterQuery = {$and: [{category: req.body.filterCategory}, {deadline: filterDeadline}]};
                
                filterLists = await List.find(filterQuery);
            }else if(req.body.filterDeadline){
                Options.filterDeadline = req.body.filterDeadline;
                Options.filterCategory = null;
                let filterDeadline = new Date(req.body.filterDeadline);
                filterDeadline.setHours(23);
                filterDeadline.setMinutes(59);
                filterDeadline.setSeconds(59);
                filterQuery = {deadline: filterDeadline};

                filterLists = await List.find(filterQuery);
            }else if(req.body.filterCategory){
                Options.filterDeadline = null;
                Options.filterCategory = req.body.filterCategory;
                filterQuery = {category: req.body.filterCategory};

                let listWithDeadline = await List.find({$and: [{deadline: {$ne: null}}, filterQuery]}).sort({deadline: 1});
                let listWithoutDeadline = await List.find({$and: [{deadline: null}, filterQuery]});
                filterLists = listWithDeadline.concat(listWithoutDeadline);
            }

            /* SEND LIST FILTER ERROR IF RESULT DOESN'T HAVE ANY ITEM */
            if(filterLists.length == 0){
                Options.listFilterError = 'No List Item Exists with specified criteria.';
                return res.render('home', Options);
            }
            Options.lists = filterLists;
            return res.render('home', Options);
        }else{
            return res.redirect('/');
        }
    }catch(e){
        console.log('something went wrong. ' + err);
        return res.render('home', { listFilterError: 'Something went wrong while filtering list.'});
    }
}