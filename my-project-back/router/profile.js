const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const db = require("../models");

router.get("/comments", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    console.log(req.query);
    const comments = await db.Comment.findAll({
      where: { userId: req.user.id },
      attributes: ["id", "content", "createdAt"],
      limit: limit,
      offset: offset,
      include: [
        {
          model: db.Movie,
          attributes: ["id", "title"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    const cnt = await db.Comment.count({
      where: { userId: req.user.id },
    });

    if (comments) {
      return res.status(200).json({
        comments: comments,
        cnt: cnt,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete("/comment/:id", async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await db.Comment.findOne({
      where: { id: commentId },
    });

    if (comment) {
      await db.Comment.destroy({
        where: { id: comment.id },
      });

      return res.status(200).json({
        id: commentId,
      });
    }

    return res.status(403).json({
      message: "존재하지 않는 댓글입니다.",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/movie", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    console.log(req.query);
    console.log(offset);
    if (req.user) {
      const user = await db.User.findOne({
        where: { id: req.user.id },
      });
      const movies = await user.getLiked({
        limit: limit,
        offset: offset,
        include: [
          {
            model: db.User,
            as: "Likers",
            attributes: ["id"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      const cnt = await user.countLiked();
      console.log("cnt: ", cnt);
      // const movies = await user.getLiked();
      console.log(movies.length);
      return res.status(200).json({
        movies: movies,
        cnt: cnt,
      });
    } else {
      return res.json(req.user);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
