const CognitoOAuth2Strategy = require('cognito-passport-oauth2');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function (user, done) {
        done(null, user);
    });

    const options = {
        callbackURL: 'http://localhost:4001/auth/callback',
        clientDomain: 'https://domain.auth.eu-west-1.amazoncognito.com',
        clientID: 'yourclientid',
        clientSecret: 'yourclientsecret',
        region: 'eu-west-1',
        passReqToCallback: true
    };

    const customOptions = { identity_provider: 'samlapp' }

    async function verify(req, accessToken, refreshToken, profile, done) {

        let sessionData = {
            username: profile.username,
            role: 'Admin',
            userId: 1,
            isAdmin: true
        }

        return done(null, sessionData);
    };

    passport.use('cognito', new CognitoOAuth2Strategy(options, verify, customOptions));
};
