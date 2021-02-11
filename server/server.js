const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

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

/* API ERROR PAGES */
app.use('/api', (req,res) => {
   res.status(404).send({message: 'Not found...'});
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('*', (req,res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* START SERVER */
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...')
});