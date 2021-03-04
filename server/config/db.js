const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const express = require('express');
const app = express();

const connectToDB = () => {
    const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.g9pgz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

    mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;

    const mongoStore = MongoStore.create({
        mongoUrl: dbURI,
        collectionName: "sessions",
    });

    app.use(
        session({
            secret: 'hiorii',
            saveUninitialized: false,
            store: mongoStore,
            cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
        })
    );

    db.once('open', () => {
        console.log('Successfully connected to the database');
    });
    db.on('error', err => console.log('Error: ' + err));
};

module.exports = connectToDB;