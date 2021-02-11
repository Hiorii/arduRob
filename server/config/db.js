const mongoose = require('mongoose');

const connectToDB = () => {
    const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.g9pgz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

    mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.once('open', () => {
        console.log('Successfully connected to the database');
    });
    db.on('error', err => console.log('Error: ' + err));
};

module.exports = connectToDB;