const commentModel = require('./../models/commentModel');
const postModel = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPostComments = catchAsync(async (req, res, next) => {
  const PostId = req.params.postId;
  const postData = await postModel
    .findById(PostId)
    .populate({ path: 'comments' })
    .select('comments');
  res.locals.currentComments = postData;
  res.status(200).json({
    status: 'Ok',
    data: postData,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const PostId = req.params.postId;
  const FindPost = await postModel.findById(PostId);
  if (FindPost) {
    const commentCreate = await commentModel.create({
      text: req.body.text,
      authorId: req.user.id,
      authorUsername: req.user.username,
      postId: PostId,
    });
    FindPost.comments.push(commentCreate.id);
    FindPost.save();
    // let query = await postModel.findById(PostId).populate('comments');
    // console.log(query);
    return res.status(200).json({
      status: 'Ok',
      data: commentCreate,
      length: FindPost.comments.length,
    });
  }
  next(new AppError('no post found with that Id', 404));
});

exports.patchComment = catchAsync(async (req, res, next) => {
  const PostId = req.params.postId;
  const CommentId = req.params.commentId;
  const Post = await postModel.findById(PostId);
  if (Post) {
    const newComment = await commentModel.findByIdAndUpdate(CommentId, {
      text: req.body.text,
      isEdited: true,
    });
    if (newComment) {
      return res.status(200).json({
        status: 'success',
        data: newComment,
      });
    }
  }
  next(new AppError('no post or comment found with that ID', 404));
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const PostId = req.params.postId;
  const CommentId = req.params.commentId;
  const Post = await postModel.findById(PostId);
  if (Post) {
    const newComment = await commentModel.findByIdAndDelete(CommentId);
    if (newComment) {
      const index = Post.comments.indexOf(CommentId);
      Post.comments.splice(index, 1);
      Post.save();
      return res.status(200).json({
        status: 'success',
        length: Post.comments.length,
      });
    }
  }
  next(new AppError('no post or comment found with that ID', 404));
});
