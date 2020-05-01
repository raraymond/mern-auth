const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');

const app = express();

//set up middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

//configure the database
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//routes
app.use('/api/users', users);

const port = process.env.PORT || 5000; //use heroku if deployed theregit

app.listen(port, () => console.log(`Server up and running on port ${port} !`));