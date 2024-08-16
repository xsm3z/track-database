const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MONGO_URI = process.env.MONGO_URI

const passUserToView = require('./middleware/pass-user-to-view');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const vehicleRoutes = require('./routes/vehicles');
const driverRoutes = require('./routes/drivers');

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('You did it, I am connected to Mongo')
})

mongoose.connection.on('error', () => {
    console.log('Dont get mad but you have an error')
})

app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 
app.use(express.static('public')); 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passUserToView);
app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/drivers', driverRoutes);
app.get('/', (req, res) => {
  res.render('home'); 
});

app.listen(3000, () => {
  console.log('Running the app on 3000')
})