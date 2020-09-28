const express = require('express');
const got = require('got');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "hello"
    });
});

router.get('/movieapi',async (req,res,next)=>{
    const url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.xml';
    
});

module.exports = router;