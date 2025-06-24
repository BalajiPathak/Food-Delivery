// passport.js - dummy content
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false, { message: 'No user found' });

      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? done(null, user) : done(null, false, { message: 'Password incorrect' });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ where: { email: profile.emails[0].value } });
        if (user) return done(null, user);

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: 'google',
        });

        return done(null, newUser);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
  });
};
