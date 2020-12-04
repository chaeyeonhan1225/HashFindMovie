const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const db = require("../models");
const ColorHash = require("color-hash");

const router = express.Router();

// getUser 유저가 로그인해 있는지 검사
router.get("/user", async (req, res, next) => {
  console.log("/user 실행!");
  const user = req.user;
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      errorCode: 1,
      message: "유저가 로그인하지 않았습니다.",
    });
  }
});

// logout 로그아웃
router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    req.session.destroy();
    return res.status(200).send("로그아웃 되었습니다.");
  }
});

// 로그인 요청
router.post("/login", async (req, res, next) => {
  console.log("로그인 요청");
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
    }
    if (!user) {
      console.log("user가 없습니다.");
      return;
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
      }
      console.log(user);
      console.log(req.session);
      const fullUser = await User.findOne({
        where: { id: user.id },
        attributes: ["id", "nick", "info", "color"],
        include: [
          {
            model: db.Comment,
            include: [
              {
                model: db.Movie,
                attributes: ["id", "title"],
              },
            ],
          },
        ],
      });
      res.json(fullUser);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, nickname } = req.body;
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await User.findOne({ where: { email: email } });
    const colorHash = new ColorHash();
    if (exUser) {
      return res.status(403).json({
        errorCode: 2,
        message: "이미 등록된 이메일입니다.",
      });
    }

    const newUser = await User.create({
      email: email,
      nick: nickname,
      password: hash,
      color: colorHash.hex(Math.random().toString(16)),
    });
    console.log(newUser);

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          attributes: ["id", "nick", "info", "color"],
          include: [
            {
              model: db.Comment,
              include: [
                {
                  model: db.Movie,
                  attributes: ["id", "title"],
                },
              ],
            },
          ],
        });
        res.json(fullUser);
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.patch("/userinfo", async (req, res, next) => {
  try {
    const result = await User.update(
      {
        info: req.body.userInfo,
      },
      {
        where: { id: req.user.id },
      }
    );

    if (result) {
      console.log("result: ", result);
      return res.status(200).json({
        info: req.body.userInfo,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
