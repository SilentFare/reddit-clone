const database = require('../database');
const AppError = require('../utilities/appError');

const create = async (req, res, next) => {
  const { post_id, parentCommentId, text } = req.body;
  try {
    const postData = await database
      .table('posts')
      .select()
      .where({ id: post_id });
    if (postData.length === 0) {
      throw new AppError('Post not found', 404);
    }
    if (parentCommentId) {
      const commentData = await database
        .table('comments')
        .select()
        .where({ id: parentCommentId });
      if (commentData.length === 0) {
        throw new AppError('Parent comment not found', 404);
      }
    }
    console.log('Parent', parentCommentId);
    const commentArray = await database.table('comments').insert(
      {
        user_id: req.user.id,
        post_id,
        parent_comment_id: parentCommentId,
        text
      },
      '*'
    );
    const comment = commentArray[0];
    comment['user'] = req.user.name;
    return res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
};

const getByPost = async (req, res, next) => {
  const { post_id } = req.params;
  try {
    if (!post_id) {
      throw new AppError('Post ID not found', 422);
    }
    const postData = await database
      .table('posts')
      .select()
      .where({ id: post_id });
    if (postData.length === 0) {
      throw new AppError('Post not found', 404);
    }
    let comments = database
      .table('comments')
      .select('comments.*', 'users.name as user', 'x.upvotes')
      .where({ post_id })
      .leftJoin('users', 'users.id', 'comments.user_id')
      .leftJoin(
        database
          .table('comment_votes')
          .select(
            'comment_id',
            database.raw('SUM(CASE WHEN vote THEN 1 ELSE -1 END) as upvotes')
          )
          .groupBy('comment_id')
          .as('x'),
        'x.comment_id',
        'comments.id'
      );
    if (req.user) {
      comments
        .leftJoin(
          database
            .table('comment_votes')
            .select('comment_id', 'vote')
            .where({ user_id: req.user.id })
            .as('y'),
          'y.comment_id',
          'comments.id'
        )
        .select('y.vote');
    }
    comments = await comments;
    res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
};

const getByUser = async (req, res, next) => {
  const { userName } = req.params;
  try {
    if (!userName) {
      throw new AppError('User name not found', 422);
    }
    const userData = await database
      .table('users')
      .select()
      .where({ name: userName });
    if (userData.length === 0) {
      throw new AppError('User not found', 404);
    }
    let comments = database
      .table('comments')
      .select(
        'comments.*',
        'users.name as user',
        'x.upvotes',
        'posts.title as post_title',
        'post_user.name as post_user_name',
        'communities.name as community'
      )
      .leftJoin('users', 'users.id', 'comments.user_id')
      .leftJoin(
        database
          .table('comment_votes')
          .select(
            'comment_id',
            database.raw('SUM(CASE WHEN vote THEN 1 ELSE -1 END) as upvotes')
          )
          .groupBy('comment_id')
          .as('x'),
        'x.comment_id',
        'comments.id'
      )
      .leftJoin('posts', 'posts.id', 'comments.post_id')
      .leftJoin('communities', 'communities.id', 'posts.community_id')
      .leftJoin('users as post_user', 'post_user.id', 'posts.user_id')
      .where('users.name', userName);
    if (req.user) {
      comments
        .leftJoin(
          database
            .table('comment_votes')
            .select('comment_id', 'vote')
            .where({ user_id: req.user.id })
            .as('y'),
          'y.comment_id',
          'comments.id'
        )
        .select('y.vote');
    }
    comments = await comments;
    res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
};

const upvote = async (req, res, next) => {
  const { comment_id } = req.body;
  try {
    // Check whether comment with id exists
    const comments = await database
      .table('comments')
      .select()
      .where({ id: comment_id });
    if (comments.length === 0) {
      throw new AppError('Comment not found', 404);
    }
    // Check whether user already voted for the comment
    const votes = await database
      .table('comment_votes')
      .select()
      .where({ user_id: req.user.id, comment_id });
    if (votes.length === 0) {
      // Create new upvote for the comment
      const newVote = await database
        .table('comment_votes')
        .insert({ user_id: req.user.id, comment_id, vote: true }, '*');
      return res.status(201).json({ vote: newVote[0], action: 'create' });
    } else {
      const commentVote = votes[0];
      if (commentVote.vote) {
        const deletedVote = await database
          .table('comment_votes')
          .del()
          .where({ user_id: req.user.id, comment_id })
          .returning('*');
        return res.status(200).json({ vote: deletedVote[0], action: 'delete' });
      } else {
        const updatedVote = await database
          .table('comment_votes')
          .update({ vote: true }, '*')
          .where({ user_id: req.user.id, comment_id });
        return res.status(200).json({ vote: updatedVote[0], action: 'update' });
      }
    }
  } catch (error) {
    next(error);
  }
};

const downvote = async (req, res, next) => {
  const { comment_id } = req.body;
  try {
    // Check whether comment with id exists
    const comments = await database
      .table('comments')
      .select()
      .where({ id: comment_id });
    if (comments.length === 0) {
      throw new AppError('Comment not found', 404);
    }
    // Check whether user already voted for the comment
    const votes = await database
      .table('comment_votes')
      .select()
      .where({ user_id: req.user.id, comment_id });
    if (votes.length === 0) {
      // Create new downvote of the post
      const newVote = await database
        .table('comment_votes')
        .insert({ user_id: req.user.id, comment_id, vote: false }, '*');
      return res.status(201).json({ vote: newVote[0], action: 'create' });
    } else {
      const commentVote = votes[0];
      if (!commentVote.vote) {
        const deletedVote = await database
          .table('comment_votes')
          .del()
          .where({ user_id: req.user.id, comment_id })
          .returning('*');
        return res.status(200).json({ vote: deletedVote[0], action: 'delete' });
      } else {
        const updatedVote = await database
          .table('comment_votes')
          .update({ vote: false }, '*')
          .where({ user_id: req.user.id, comment_id });
        return res.status(200).json({ vote: updatedVote[0], action: 'update' });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getByPost,
  getByUser,
  upvote,
  downvote
};
