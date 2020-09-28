const express = require('express');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

router.get('/user',async (req,res,next)=>{
    console.log('/user 실행!');
    const user = req.user;
    console.log(req.session);
    if(user){
        return res.json(user);
    } else {
        return res.json({
            errCode: 1,
            message: "유저가 로그인하지 않았습니다."
        });
    }
});

router.post('/login',async (req,res,next)=>{
    console.log("로그인 요청");
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
        }
        if(!user){
            return;
        } 
        return req.login(user,async (loginError)=>{
            if(loginError) {
                console.error(loginError);
            }
            console.log(user);
            console.log(req.session);
            const fullUser = await User.findOne({
                where: { id: user.id }
            });
            res.json(fullUser);
        });
    })(req,res,next);
});

router.post('/signup',async (req,res,next)=>{
    console.log(req.body);
    try {
        const { email, password, nickname } = req.body;
        const exUser = await User.findOne({ where: { email: email } });
        if(exUser){
            return res.status(403).json({
                status: "reject",
                code: 1,
                message: "이미 등록된 이메일입니다."
            });
        } 
        const newUser = await User.create({
            email: email,
            nick: nickname,
            password: password,
        });
        console.log(newUser);
            
        passport.authenticate('local',(err,user,info)=>{
            if(err) {
                console.erroer(err);
                return next(err);
            }
            if(info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user,async (err) => {
                if(err) {
                    console.error(err);
                    return next(err);
                }
                return res.json(user);
            });
        })(req,res,next);        
    } catch(err) {
        console.error(err);
    }
});

router.patch('/userinfo',async (req,res,next)=>{
    console.log(req.user);
    const result = await User.update({
        info: req.body.userInfo
    },{
        where: { id: req.user.id }
    });
    console.log(req.user);
    if(result){
        console.log("result: ",result);
        return res.status(200).json({
            info: req.body.userInfo
        });
    }
});



module.exports = router;