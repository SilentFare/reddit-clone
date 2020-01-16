const database = require('../database');

const getAll = async (req, res, next) => {
  try {
    const communities = await database.table('communities').select();
    res.status(200).json({ communities });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newCommunity = await database
      .table('communities')
      .insert({ user_id: req.user.id, name }, '*');
    res.status(201).json({ community: newCommunity });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create
};
