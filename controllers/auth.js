const User = require('../models/user');

const renderSignUpForm = (req, res) => {
  res.render('auth/sign-up.ejs');
};

const renderSignInForm = (req, res) => {
  res.render('auth/sign-in.ejs');
};

const signOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const signUp = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }

    await User.create(req.body);
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

const signIn = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase || userInDatabase.password !== req.body.password) {
      return res.send('Login failed. Please try again.');
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };

    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

module.exports = {
  renderSignUpForm,
  renderSignInForm,
  signOut,
  signUp,
  signIn
};
