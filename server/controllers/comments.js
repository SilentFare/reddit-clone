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
    const comments = await database
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
    res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
};

const upvote = async (req, res, next) => {
  const { comment_id } = req.body;
  try {
  } catch (error) {
    next(error);
  }
};

const downvote = async (req, res, next) => {};

module.exports = {
  create,
  getByPost,
  upvote,
  downvote
};
