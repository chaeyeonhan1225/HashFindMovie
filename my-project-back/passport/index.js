const local = require('./localStrategy');
const db = require('../models');
const { Movie } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user,done)=>{
        console.log(user);
        console.log('serializeUser 실행!');
        done(null,user.id);
    }); // 사용자의 식별자를 session에 저장한다.
    
    passport.deserializeUser(async(id,done)=>{
        console.log('deserializeUser 실행!');
        try {
            const user = await db.User.findOne({
                where: { id },
                attributes: ['id','email','nick','info','color'],
                include: [{
                    model: db.Comment,
                    include: [{
                        model: db.Movie,
                        attributes: ['id','title'],
                    }]
                }]
            });
            return done(null,user);
        } catch (err) {
            console.error(err);
            console.log("deserializeUser 에러!");
            return done(err);
        }
    });
    local(passport);
}