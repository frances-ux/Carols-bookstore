require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('node:path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes/index');
const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());

app.use(passport.session());

app.use(routes);

require('./config/connection');

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log(`You can put your MongoDB link here when the server restarts to jump to your database.`);
    console.log(`MongoDB: mongodb+srv://francesmarquez94:VnSeaXBTOT0ALlks@cluster0.iwgcrwj.mongodb.net/carolsBookstore?retryWrites=true&w=majority`);
});


