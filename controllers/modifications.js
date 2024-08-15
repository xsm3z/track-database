const Modification = require('../models/modification')

const index = async (req, res) => {
  try {
    const foundModifications = await Modification.find({})
    res.render('modifications/index.ejs', {
      modifications: foundModifications
    })
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const newFunc = (req, res) => {
  res.render('modifications/new.ejs')
}

const destroy = async (req, res) => {
  try {
    const modification = await Modification.findByIdAndDelete(req.params.id);
    if (!modification) {
      return res.status(404).json({ msg: 'Modification not found' });
    }
    res.redirect('/modifications');
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedModification = await Modification.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    res.redirect(`/modifications/${updatedModification._id}`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const create = async (req, res) => {
  try {
    const createdModification = await Modification.create(req.body)
    res.redirect(`/modifications/${createdModification._id}`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const edit = async (req, res) => {
  try {
      const foundModification = await Modification.findOne({ _id: req.params.id })
      res.render('modifications/edit.ejs', {
          modification: foundModification
      })
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

const show = async (req, res) => {
  try {
      const foundModification = await Modification.findOne({ _id: req.params.id }).populate('posts comments')
      res.render('modifications/show.ejs', {
          modification: foundModification
      })
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

module.exports = {
  index,
  newFunc,
  destroy,
  update,
  create,
  edit,
  show
}