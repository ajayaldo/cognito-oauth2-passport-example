const session = require('express-session'),
    express = require('express'),
    app = express(),
    BodyParser = require('body-parser'),
    CookieParser = require('cookie-parser'),
    passport = require('passport'),
    passportConfig = require('./passportConfig'),
    flash = require('req-flash');

const port = 4001;

app.use(BodyParser.json());
app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'some secret',
    name: 'somecookiename',
    rolling: true,
}));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/auth/login', passport.authenticate('cognito'));
app.get('/auth/callback', passport.authenticate('cognito', { failureRedirect: '/error', failureFlash: true, successRedirect: '/index' }));

app.get('/index', function (req, res) {
    indexHandler(req, res);
});

function indexHandler(req, res) {
    let pageParameters =
    {
        username: req.user.username,
        appname: 'Passport Cognito OAuth2 App'
    };

    pageParameters.username = req.user.username;

    res.render('pages/index', pageParameters)
}


console.log('App running on ' + port)

app.listen(port);