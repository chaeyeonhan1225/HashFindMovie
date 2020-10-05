const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const indexRouter = require('./router');
const authRouter = require('./router/auth');
const postRouter = require('./router/post');
const profileRouter = require('./router/profile');

require('dotenv').config();

const app = express();
sequelize.sync({ force: true });
passportConfig(passport);

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
// passport




// 미들웨어 

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

// 라우터
app.use('/',indexRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/profile',profileRouter);


app.listen('3001',()=>{
    console.log('3001포트에서 my-project 서버 실행중!');
});