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
    const newComment = await database.table('comments').insert(
      {
        user_id: req.user.id,
        post_id,
        parent_comment_id: parentCommentId,
        text
      },
      '*'
    );
    return res.status(201).json({ comment: newComment });
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
      .select()
      .where({ post_id });
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
