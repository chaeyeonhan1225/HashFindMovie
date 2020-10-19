const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/today', async (req, res, next) => {
    try {
        const movies = await db.Movie.findAll({
            include: [{
                model: db.Comment,
                include: [{
                    model: db.User,
                    attributes: ['nick', 'color'],
                }]
            }, {
                model: db.User,
                as: 'Likers',
                attributes: ['id'],
            }],
            limit: 5,
            order: [
                ['id', 'ASC'],
            ]
        });
        return res.json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 랜덤 영화
router.get('/random', (req, res, next) => {

});

module.exports = router;