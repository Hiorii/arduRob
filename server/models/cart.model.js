const mongoose = require('mongoose');

// const contactSchema = new mongoose.Schema({
//     email: {type: String, required: true},
//     name: {type: String, required: true},
//     adress: {type: String, required: true},
//     zipCode: {type: String, required: true},
//     city: {type: String, required: true},
//     country: {type: String, required: true},
//     phone: {type: String, required: true},
// });

const cartSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    adress: {type: String, required: true},
    zipCode: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    phone: {type: String, required: true},
    status: {type: Boolean, required: true},
    productsOrder: [{
        product: {type: String, required: true},
        quantity: {type: String, required: true},
    }],
    payment: {type: String, required: true},
    shipping: {type: String, required: true},
    comment: {type: String},
});

module.exports = mongoose.model('Cart', cartSchema);