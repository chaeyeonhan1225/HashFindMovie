const local = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user,done)=>{
        console.log(user);
        console.log('serializeUser 실행!');
        done(null,user.id);
    }); // 사용자의 식별자를 session에 저장한다.
    
    passport.deserializeUser(async(id,done)=>{
        console.log('deserializeUser 실행!');
        try {
            const user = await User.findOne({
                where: { id },
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