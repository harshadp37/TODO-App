var List = require('../models/list');

module.exports.addToList = (req, res) => {
    if (req.body.title) {
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

module.exports.deleteListItems = (req, res) => {
    console.log(req.body);
    return res.redirect('/')
    /* 
    List.findById(req.params.id, (err, listItem)=>{
        if (err) {
            console.log('something went wrong. ' + err);
            return res.redirect('/');
        }
        if(!listItem){
            console.log('something went wrongg.');
            return res.redirect('/')
        }
        listItem.remove();
        return res.redirect('/')
    }) */
}

module.exports.filterList = async (req, res) => {
    try{
        let Options = {};
        if(req.body.filterDeadline || req.body.filterCategory){
            console.log(req.body.filterDeadline ? "true" : "false")
            console.log(req.body.filterCategory ? "true" : "false")
            let filterQuery = {};
            let filterLists = [];
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