const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    adress: {type: String, required: true},
    city: {type: String, required: true},
    postCode: {type: String, required: true},
    country: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);
