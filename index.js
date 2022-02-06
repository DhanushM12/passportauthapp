if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const port = 8000;
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override')
const users = [];

const initializePassport = require('./config/passportlocal');
initializePassport(passport,
    email => users.find(user => user.email == email,
    id => users.find(user => user.id == id)   
        ));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`)
})