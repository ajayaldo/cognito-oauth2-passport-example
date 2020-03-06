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
        clientDomain: 'https://yourdomain.auth.eu-west-1.amazoncognito.com',
        clientID: 'cognitoclientid',
        clientSecret: 'cognitoclientsecret',
        region: 'eu-west-1',
        passReqToCallback: true
    };

    async function verify(req, accessToken, refreshToken, profile, done) {

        let sessionData = {
            username: profile.username,
            role: 'Admin',
            userId: 1,
            isAdmin: true
        }

        return done(null, sessionData);
    };
    //you can provide the custom parameters like identity_providers, idp_identifier, code_challenge, code_challenge_method in custom options. 
    const customOptions = { identity_provider: 'samlapp' }
    passport.use('cognito', new CognitoOAuth2Strategy(options, verify, customOptions));
};
