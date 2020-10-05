const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const db = require('../models');

router.get('/likedMovie', async (req,res,next)=>{
    try {
        console.log(req.user);
        if(req.user){
            const user = await db.User.findOne({
                where: { id: req.user.id }
            });
            const movies = await user.getLiked();
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