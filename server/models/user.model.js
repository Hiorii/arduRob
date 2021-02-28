const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 2},
    lastName: {type: String, required: true, minlength: 2},
    telephone: {type: String, required: true, minlength: 5},
    email: {type: String, required: true, minlength: 5},
    password: {type: String, required: true, minlength: 6},
    adress: {type: String, required: true},
    city: {type: String, required: true},
    postCode: {type: String, required: true},
    country: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);
