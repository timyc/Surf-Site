const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./core/routes');
const paypal = require('./core/paypal');
const SteamStrategy = require('./steam/').Strategy;

const sPort = 3000;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
        returnURL: 'https://YOUR_DOMAIN/auth/steam/return',
        realm: 'https://YOUR_DOMAIN/',
        apiKey: 'YOUR_KEY'
    },
    function(identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('trust proxy', 1);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);
app.get('/nojs', routes.nojs);
app.get('/auth/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });
app.get('/auth/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
app.post('/internal/ipn', paypal);

app.listen(sPort, function(){
    console.log('[SERVER] Express started on port ' + sPort);
});

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log('Will not crash... for now.');
});
