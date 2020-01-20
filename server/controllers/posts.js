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
    const posts = await database
      .table('posts')
      .select(
        'posts.id',
        'posts.user_id',
        'users.name as user',
        'posts.community_id',
        'communities.name as community',
        'posts.title',
        'posts.text',
        'posts.created_at',
        'posts.updated_at'
      )
      .leftJoin('users', 'posts.user_id', 'users.id')
      .leftJoin('communities', 'posts.community_id', 'communities.id');
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

const getByCommunity = async (req, res, next) => {
  const { community } = req.params;
  try {
    const posts = await database
      .table('posts')
      .select(
        'posts.id',
        'posts.user_id',
        'users.name as user',
        'posts.community_id',
        'communities.name as community',
        'posts.title',
        'posts.text',
        'posts.created_at',
        'posts.updated_at'
      )
      .leftJoin('users', 'posts.user_id', 'users.id')
      .leftJoin('communities', 'posts.community_id', 'communities.id')
      .where({ name: community });
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
