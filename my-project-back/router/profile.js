const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const db = require('../models');

router.get('/movie', async (req,res,next)=>{
    try {
        if(req.user){
            const user = await db.User.findOne({
                where: { id: req.user.id }
            });
            const movies = await user.getLiked({
                limit: 6,
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

router.get('/movie/preview',async (req,res,next)=>{ // 최대 6개까지만 불러옴
    try {
        if(req.user){
            const user = await db.User.findOne({
                where: { id: req.user.id }
            });
            const movies = await user.getLiked({
                limit: 6,
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