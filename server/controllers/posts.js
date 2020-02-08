const database = require('../database');
const AppError = require('../utilities/appError');

const create = async (req, res, next) => {
  const { community, title, text } = req.body;
  try {
    const communities = await database
      .table('communities')
      .select()
      .where({ name: community });
    if (communities.length === 0) {
      throw new AppError('Community not found', 404);
    }
    const searchedCommunity = communities[0];
    const newPost = await database.table('posts').insert(
      {
        user_id: req.user.id,
        community_id: searchedCommunity.id,
        title,
        text
      },
      '*'
    );
    res.status(201).json({ post: newPost[0] });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    let posts = database
      .table('posts')
      .select(
        'posts.id',
        'posts.user_id',
        'users.name as user',
        'posts.community_id',
        'communities.name as community',
        'posts.title',
        'posts.text',
        'x.upvotes',
        'posts.created_at',
        'posts.updated_at'
      )
      .leftJoin('users', 'posts.user_id', 'users.id')
      .leftJoin('communities', 'posts.community_id', 'communities.id')
      .leftJoin(
        database
          .table('post_votes')
          .select(
            'post_id',
            database.raw('SUM(CASE WHEN vote THEN 1 ELSE -1 END) as upvotes')
          )
          .groupBy('post_id')
          .as('x'),
        'x.post_id',
        'posts.id'
      );
    if (req.user) {
      posts
        .leftJoin(
          database
            .table('post_votes')
            .select('post_id', 'vote')
            .where({ user_id: req.user.id })
            .as('y'),
          'y.post_id',
          'posts.id'
        )
        .select('y.vote');
    }
    posts = await posts;
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

const getByCommunity = async (req, res, next) => {
  const { communityName } = req.params;
  try {
    let posts = database
      .table('posts')
      .select(
        'posts.id',
        'posts.user_id',
        'users.name as user',
        'posts.community_id',
        'communities.name as community',
        'posts.title',
        'posts.text',
        'x.upvotes',
        'posts.created_at',
        'posts.updated_at'
      )
      .leftJoin('users', 'posts.user_id', 'users.id')
      .leftJoin('communities', 'posts.community_id', 'communities.id')
      .leftJoin(
        database
          .table('post_votes')
          .select(
            'post_id',
            database.raw('SUM(CASE WHEN vote THEN 1 ELSE -1 END) as upvotes')
          )
          .groupBy('post_id')
          .as('x'),
        'x.post_id',
        'posts.id'
      )
      .where({ 'communities.name': communityName });
    if (req.user) {
      posts
        .leftJoin(
          database
            .table('post_votes')
            .select('post_id', 'vote')
            .where({ user_id: req.user.id })
            .as('y'),
          'y.post_id',
          'posts.id'
        )
        .select('y.vote');
    }
    posts = await posts;
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

const upvote = async (req, res, next) => {
  const { post_id } = req.body;
  try {
    // Check whether post with id exists
    const posts = await database
      .table('posts')
      .select()
      .where({ id: post_id });
    if (posts.length === 0) {
      throw new AppError('Post not found', 404);
    }
    // Check whether user already voted for the post
    const votes = await database
      .table('post_votes')
      .select()
      .where({ user_id: req.user.id, post_id });
    if (votes.length === 0) {
      // Create new upvote of the post
      const newVote = await database
        .table('post_votes')
        .insert({ user_id: req.user.id, post_id, vote: true }, '*');
      return res.status(201).json({ vote: newVote[0], action: 'create' });
    } else {
      const postVote = votes[0];
      if (postVote.vote) {
        const deletedVote = await database
          .table('post_votes')
          .del()
          .where({ user_id: req.user.id, post_id })
          .returning('*');
        return res.status(200).json({ vote: deletedVote[0], action: 'delete' });
      } else {
        const updatedVote = await database
          .table('post_votes')
          .update({ vote: true }, '*')
          .where({ user_id: req.user.id, post_id });
        return res.status(200).json({ vote: updatedVote[0], action: 'update' });
      }
    }
  } catch (error) {
    next(error);
  }
};

const downvote = async (req, res, next) => {
  const { post_id } = req.body;
  try {
    // Check whether post with id exists
    const posts = await database
      .table('posts')
      .select()
      .where({ id: post_id });
    if (posts.length === 0) {
      throw new AppError('Post not found', 404);
    }
    // Check whether user already voted for the post
    const votes = await database
      .table('post_votes')
      .select()
      .where({ user_id: req.user.id, post_id });
    if (votes.length === 0) {
      // Create new downvote of the post
      const newVote = await database
        .table('post_votes')
        .insert({ user_id: req.user.id, post_id, vote: false }, '*');
      return res.status(201).json({ vote: newVote[0], action: 'create' });
    } else {
      const postVote = votes[0];
      if (!postVote.vote) {
        const deletedVote = await database
          .table('post_votes')
          .del()
          .where({ user_id: req.user.id, post_id })
          .returning('*');
        return res.status(200).json({ vote: deletedVote[0], action: 'delete' });
      } else {
        const updatedVote = await database
          .table('post_votes')
          .update({ vote: false }, '*')
          .where({ user_id: req.user.id, post_id });
        return res.status(200).json({ vote: updatedVote[0], action: 'update' });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      throw new AppError('Post ID not found', 422);
    }
    const data = await database
      .table('posts')
      .select()
      .where({ id: post_id });
    console.log('Data', data);
    if (data.length === 0) {
      throw new AppError('Post not found', 404);
    }
    return res.status(200).json({ post: data[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getByCommunity,
  upvote,
  downvote,
  getOne
};
