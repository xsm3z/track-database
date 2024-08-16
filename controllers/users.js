const User = require('../models/user');

const index = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.render('users/index.ejs', { allUsers });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

const show = async (req, res) => {
  try {
    const pageOwner = await User.findById(req.params.userId);
    res.render('users/show.ejs', { pageOwner });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

module.exports = {
  index,
  show
};
