const NewsComment = require("../models/NewsComment");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.createComment = asyncHandler(async (req, res, next) => {
  let comment = await NewsComment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.getComments = asyncHandler(async (req, res, next) => {
  const newsId = req.query.newsId;
  let query = "";

  if (newsId) {
    query = await NewsComment.find({})
      .where("news")
      .in(newsId)
      .sort({ createAt: -1 });
  } else {
    query = await NewsComment.find({}).sort({ createAt: -1 });
  }

  res.status(200).json({
    success: true,
    data: query,
  });
});

exports.getComment = asyncHandler(async (req, res) => {
  const comment = await NewsComment.findById(req.params.id);

  if (!comment) {
    throw new MyError(req.params.id + " Өгөгдөл олдсонгүй.", 404);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await NewsComment.findById(req.params.id);
  if (!comment) {
    throw new MyError(req.params.id + " өгөгдөл олдсонгүй", 404);
  }
  comment.remove();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const comment = await NewsComment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    throw new MyError("Уучлаарай хадгалах явцад алдаа гарлаа", 400);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.multDeleteComment = asyncHandler(async (req, res, next) => {
  const ids = req.queryPolluted.id;
  const findComment = await NewsComment.find({ _id: { $in: ids } });

  if (findComment.length <= 0) {
    throw new MyError("Таны сонгосон өгөгдөлүүд олдсонгүй", 400);
  }

  const comments = await findComment.deleteMany({ _id: { $in: ids } });

  res.status(200).json({
    success: true,
  });
});

exports.getCountNewsComment = asyncHandler(async (req, res, next) => {
  const newsId = req.query.newsId;
  let comment = 0;
  if (newsId) {
    comment = await NewsComment.count({ news: newsId });
  } else {
    comment = await NewsComment.count();
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});
