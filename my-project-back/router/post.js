const express = require('express');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        await db.Movie.create({
            title: "알라딘",
            movieCd: "12341",
        });
        await db.Movie.create({
            title: "인터스텔라",
            movieCd: "12124",
        });
        await db.Movie.create({
            title: "악마는 프라다를 입는다",
            movieCd: "12312",
        });
        await db.Movie.create({
            title: "노팅힐",
            movieCd: "12315",
        });
        await db.Movie.create({
            title: "인셉션",
            movieCd: "12323",
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
            },{
                model: db.User,
                as: 'Likers',
                attributes: ['id'],
            }],
            order: [['id','ASC'],]
        });
        return res.json(movies);
    } catch (err) {
        console.error(err);
    }
});

router.post('/comment', isLoggedIn, async (req, res, next) => {
    console.log("요청들어옴!");
    console.log(req.body);
    try {
        console.log(req.body);
        const movie = await db.Movie.findOne({
            where: { id: req.body.movieId }
        });
        console.log(movie);
        if(movie){
            await db.Comment.create({
                userId: req.user.id,
                movieId: movie.id,
                content: req.body.content,
            });
            const hashtags = req.body.content.match(/#[^\s#]+/g);
            console.log(hashtags);
            if(hashtags) {
                const result = await Promise.all(hashtags.map(tag=> db.Hashtag.findOrCreate({
                    where: { content: tag.slice(1).toLowerCase() },
                })));
                await movie.addHashtags(result.map(r=>r[0]));
            }
            
            const fullComments = await db.Comment.findAll({
                where: { movieId: movie.id },
                include: {
                    model: db.User,
                    attributes: ['nick'],
                },
                order: [['createdAt','ASC']],
            });
            return res.json(fullComments);
        } else {
            console.log(req.body);
            return res.status(401).json({
                errorCode: 2,
                message: "잘못된 접근입니다.",
            });
        }
        
        
    } catch (error) {
        console.error(error);
    }
});


router.get('/:id/comments', async (req, res, next) => {
    try {
        const movie = await db.Movie.findOne({
            where: { id: req.params.id },
        });
        if(movie) {
        const fullComments = await db.Comment.findAll({
            where: {
                movieId: req.params.id,
            },
            include: [{
                model: db.User,
                attributes: ['nick'],
            }],
            order: [['createdAt','ASC']],
        });
        
        return res.json(fullComments);
    } else {
        return res.status(404).json({
            errorCode: 2,
            message: "잘못된 접근입니다.",
        });
    }
    } catch (error) {
        console.error(error);
    }
});

router.post('/:id/like',async (req,res,next)=>{
    try {
        console.log(req.body);
        const movie = await db.Movie.findOne({
            where: { id: req.body.movieId }
        });
        if(movie) {
            await movie.addLiker(req.user.id);
            return res.json({ userId: req.user.id });
        } else {
            return res.status(404).json({
                errorCode: 2,
                message: "잘못된 접근입니다."
            });
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;