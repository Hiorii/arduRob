const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.getAll = async(req, res) => {
    try {
        const result = await User.find();
        if(!result) res.status(404).json({message: 'Not found...'});
        else res.json(result);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.signGoogle = async(req,res) => {
    const {email, givenName, familyName } = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) {
            const newUser = new User({
                firstName: givenName,
                lastName: familyName,
                telephone: ' ',
                email: email,
                password: await bcrypt.hash('defaultPasswordGoogle', 12),
                adress: ' ',
                city: ' ',
                postCode: ' ',
                country: ' ',
            });
            await newUser.save();
            res.status(200).json({newUser});
        } else {
            res.status(200).json({result: existingUser});
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.signIn = async(req,res) => {
    const {email, password } = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) res.status(404).json({message: 'User does not exist'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'arduRobSecretPass', {expiresIn: '1h'});

        res.status(200).json({result: existingUser, token});

    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.signUp = async(req,res) => {
    const {firstName, lastName, telephone, email, password, confirmPassword, adress, city, postCode, country } = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) res.status(400).json({message: 'User already exist'});
        else {
            if(password !== confirmPassword) res.status(400).json({message: 'Password do not match'});

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({ firstName, lastName, telephone, email, password: hashedPassword, adress, city, postCode, country });

            const token = jwt.sign({email: result.email, id: result._id}, 'arduRobSecretPass', {expiresIn: '1h'});

            res.status(200).json({result, token});
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
}
