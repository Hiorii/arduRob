const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoData = require('./envData/mongoDbData');
const connectToDb = require('./config/db');
const app = express();

const corsOption = {
    origin: '*',
    credentials: true,
};

/* MIDDLEWARE */
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'hiorii' }));

/* API ENDPOINTS */
app.use('/api', require('./routes/products.routes'));
app.use('/api', require('./routes/category.routes'));
app.use('/api', require('./routes/subCategory.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/cart.routes'));

/* API ERROR PAGES */
app.use('/api', (req,res) => {
   res.status(404).send({message: 'Not found...'});
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('*', (req,res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* CONNECT TO DB */
connectToDb();

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port: '+ port);
});