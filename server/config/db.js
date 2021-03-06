const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const express = require('express');
const app = express();

const connectToDB = () => {
    const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.g9pgz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const dbURIlocal = `mongodb+srv://${DB_USERNAME_LOCAL}:${DB_PASSWORD_LOCAL}@cluster0.g9pgz.mongodb.net/${DB_NAME_LOCAL}?retryWrites=true&w=majority`;

    mongoose.connect(
        (process.env.NODE_ENV === 'production') ? dbURI : dbURIlocal,
        {useNewUrlParser: true, useUnifiedTopology: true}
    );

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