const validateTitle = (req, res, next) => {
  const { body } = req;

  if (!body.title) {
    return res.status(400).json({ message: 'The field "title" is required' });
  }
  if (!body.title) {
    return res
      .status(400)
      .json({ message: 'The field "description" is required' });
  }

  next();
};

module.exports = {
  validateTitle,
};
