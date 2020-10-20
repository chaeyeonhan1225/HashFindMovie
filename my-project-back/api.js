const got = require('got');

const client_id = "rlIfIn3D8KQ96BElC7sU";
const client_secret = "zc7L01YRbL";

const movie_url = "https://openapi.naver.com/v1/search/movie.json?query='love'";
const options = {
    headers: {'X-Naver-Client-Id': client_id,"X-Naver-Client-Secret": client_secret}
};

got(movie_url,options).then(result => console.log(result.body));

