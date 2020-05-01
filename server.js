const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

//set up middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

//configure the database
const db = process.env.DB;
//connect to mongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 5000; //use heroku if deployed theregit

app.listen(port, () => console.log(`Server up and running on port ${port} !`));