require('dotenv').config();

const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  session = require('express-session'),
  flash = require('connect-flash'),
  passport = require('passport'),
  app = express();

const passportConfig = require('./passport/index'),
  connect = require('./schemas/index');
passportConfig(passport);
connect();

const indexRouter = require('./routes/index'),
  authRouter = require('./routes/auth'),
  userRouter = require('./routes/user'),
  textRouter = require('./routes/text'),
  articleRouter = require('./routes/article');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/text', textRouter);
app.use('/article', articleRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
