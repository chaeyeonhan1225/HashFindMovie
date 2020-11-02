const express = require('express');
const db = require('../models');

const router = express.Router();


// 영화 등록
router.post('/', async (req, res, next) => {
    try {
        // 로그인 했는지 검사
        if (!req.user) {
            
            console.log("로그인 안됨!");
            return res.status(404).json({
                errorCode: 1,
                message: "잘못된 접근입니다."
            });
        } 

        const { title, subtitle, pubDate } = req.body;
        const exMovie = await db.Movie.findOne({
            where: {
                title: title,
                subtitle: subtitle,
                pubDate: pubDate,
            }
        });

        // 이미 등록된 영화라면
        if (exMovie) {
            return res.status(404).json({
                errorCode: 3,
                message: "이미 등록된 영화입니다."
            });
        }

        await db.Movie.create({
            title: title,
            subtitle: subtitle,
            pubDate: pubDate,
            link: req.body.link,
            image: req.body.image,
            director: req.body.director.join('|'),
            actor: req.body.actor.join('|'),
        });

    } catch (error) {
        console.error(error);
        next(error);
    }


});

module.exports = router;