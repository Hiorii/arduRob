const SubCategory = require('../models/subCategorie.model');

exports.getAll = async(req, res) => {
  try {
      const result = await SubCategory
          .find()
          .populate('categoryId');
      if(!result) res.status(404).json({message: 'Not found...'});
      else res.json(result);
  } catch (err) {
      res.status(500).json({message: err});
  }
};