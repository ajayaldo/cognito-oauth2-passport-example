const CognitoOAuth2Strategy = require('@ajayaldo/passport-cognito-oauth2');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function (user, done) {
        done(null, user);
    });

    const options = {
        callbackURL: 'http://localhost:4001/auth/callback',
        clientDomain: 'https://bulkfedlogin.auth.eu-west-1.amazoncognito.com',
        clientID: '6c93gj1786na3d73c6sm5vbkmn',
        clientSecret: 'fbf4t7k0h6r51cv08ohfcrb10m26carbb6oq9uf9p895e8eneit',
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