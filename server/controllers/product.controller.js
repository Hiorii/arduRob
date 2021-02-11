const Product = require('../models/product.model');

exports.getAll = async (req,res)=> {
    try {
        const result = await Product.find();
        if(!result) res.status(404).json({message: 'Not found...'});
        else res.json(result);
    } catch (err) {
        res.status(500).json({message: err});
    }
};