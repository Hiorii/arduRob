const Category = require('../models/categorie.model');

exports.getAll = async(req,res) => {
    try {
        const result = await Category.find();
        if(!result) res.status(404).json({message: 'Not found...'});
        else res.json(result);
    } catch (err) {
        res.status(500).json({message: err});
    }
}