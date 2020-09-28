const express = require('express');
const db = require('../models');
const movie = require('../models/movie');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        await db.Movie.create({
            title: "알라딘",
            movieCd: "12341",
        });
        await db.Movie.create({
            title: "알라딘",
            movieCd: "12124",
        });
        await db.Movie.create({
            title: "알라딘",
            movieCd: "12312",
        });
        return res.status(200).json({
            message: "db생성 성공!",
        });
    } catch (err) {
        console.error(err);
    }

})
router.get('/movie', async (req, res, next) => {
    try {
        console.log("movie 요청!!");

        const movies = await db.Movie.findAll({
            include: [{
                model: db.Comment,
                include: [{ 
                    model: db.User,
                    attributes: ['nick'],
                }]
            }],
        });
        console.log(movies);
        return res.json(movies);
    } catch (err) {
        console.error(err);
    }
});

router.post('/comment', async (req, res, next) => {
    try {
        const {
            movieId,
            content
        } = req.body;
        console.log(req.body);
        const newComment = await db.Comment.create({
            userId: req.user.id,
            movieId: movieId,
            content: content,
        });
        
        console.log(newComment);
        
        return res.json(newComment);
    } catch (error) {
        console.error(error);
    }
});


router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await db.Comment.findAll({
            where: {
                movieId: req.params.id,
            },
            include: [{
                model: db.User,
                attributes: ['nick'],
            }],
            order: [['createdAt','ASC']],
        });
        console.log(comments);
        return res.json(comments);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;