const database = require('../database');

const create = async (req, res, next) => {
  const { community_id, title, text } = req.body;
  try {
    const newPost = await database.table('posts').insert(
      {
        user_id: req.user.id,
        community_id,
        title,
        text
      },
      '*'
    );
    res.status(201).json({ post: newPost });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const posts = await database.table('posts').select();
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

const getByCommunity = async (req, res, next) => {
  const { community_id } = req.params;
  try {
    const posts = await database
      .table('posts')
      .select()
      .where({ community_id });
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getByCommunity
};
