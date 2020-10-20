const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const db = require('../models');

router.get('/comments', async (req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit,10);
        const offset = parseInt(req.query.offset,10);
        console.log(req.query);
        const comments = await db.Comment.findAll({
            where: { userId: req.user.id },
            attributes: ['id','content', 'createdAt'],
            limit: limit,
            offset: offset,
            include: [{
                model: db.Movie,
                attributes: ['id','title']
            }],
            order: [['updatedAt','DESC']],
        });
        if(comments) {
            return res.status(200).json(comments);
        }
    } catch (error) {
        console.error(error);
    }
});


router.get('/movie', async (req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit, 10);
        const offset = parseInt(req.query.offset, 10);
        console.log(req.query);
        if(req.user){
            const user = await db.User.findOne({
                where: { id: req.user.id }
            });
            const movies = await user.getLiked({
                limit: limit,
                offset: offset,
                order: [['createdAt','DESC']],
                include: [{
                    model: db.Comment,
                    include: [{ 
                        model: db.User,
                        attributes: ['nick','color'],
                    }]
                },{
                    model: db.User,
                    as: 'Likers',
                    attributes: ['id']
                }]
            });
            // const movies = await user.getLiked();
            console.log(movies);
            return res.status(200).json(movies);
        } else {
            return res.json(req.user);
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;