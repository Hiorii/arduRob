const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    subCategoryId: {type: String, required: true},
    image: {type: String, required: true},
    imageAlt: {type: String, required: true},
    price: {type: Number, required: true},
    overview: {type: String, required: true},
    quantity: {type: Number, required: true},
});

module.exports = mongoose.model('Product', productSchema);