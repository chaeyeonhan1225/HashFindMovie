const express = require('express');
const router = express.Router();
const db = require('../models');
const got = require('got');

const client_id = "rlIfIn3D8KQ96BElC7sU";
const client_secret = "zc7L01YRbL";

const options = {
    headers: {'X-Naver-Client-Id': client_id,"X-Naver-Client-Secret": client_secret}
};

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

// 영화 찾기 (영화 등록)
router.post('/search', async (req,res,next) => {
    const { title, genre, country } = req.body;
    let req_url = "https://openapi.naver.com/v1/search/movie.json";
    req_url += `?query=${title}`;
    if (genre != 0) {
        req_url += `&genre=${genre}`;
    }
    if (country) {
        req_url += `&country=${country}`
    }
    console.log(req_url);

    const result = await got(req_url,options);
    // console.log(result.body);
    return res.json(result.body);
});

module.exports = router;