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
    
    let movies = [];
    // console.log(result.body);

    JSON.parse(result.body).items.map(movieInfo => {
        const movie = {
            title: movieInfo.title.replace(/(<([^>]+)>)/ig,''),
            subtitle: movieInfo.subtitle.replace(/(<([^>]+)>)/ig,''),
            link: movieInfo.link,
            image: movieInfo.image,
            pubDate: movieInfo.pubDate,
            director: movieInfo.director.split('|').filter(x => x !== ''),
            actor: movieInfo.actor.split('|').filter(x => x !== ''),
            userRating: parseFloat(movieInfo.userRating),
        };
        movies.push(movie);
    })
    
    movies.sort((a, b) => {
        return b.userRating - a.userRating;
    })
    console.log(movies);
    return res.json(movies);
});

module.exports = router;