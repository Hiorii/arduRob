const Cart = require('../models/cart.model');

exports.addOrder = async(req,res) => {
    const {email, name, adress, zipCode, city, country, phone, status, productsOrder, payment, shipping, comment} = req.body;

    try {
        const newOrder = new Cart({
            email, name, adress, zipCode, city, country, phone, status, productsOrder, payment, shipping, comment
        });
        await newOrder.save();
        res.status(200).json({newOrder});

    } catch (err) {
        res.status(500).json({message: err});
    }
};