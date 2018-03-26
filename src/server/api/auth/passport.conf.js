// @flow

import passport from 'passport';
import argon2 from 'argon2';

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { jwtSecret } from '../../config.json';

import models from '../../models';

const User = models.user;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
}, (jwtPayload, done) => {
  done(null, jwtPayload);
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  session: false,
}, (email, password, done) => {
  User.scope('login').findOne({ where: { email } }).then((user) => {
    if (user) {
      return argon2.verify(user.password, password).then((match) => {
        if (match) {
          done(null, user);
        } else {
          done(null, false, { message: 'Incorrect password.' });
        }
      });
    }
    done(null, false, { message: 'Email address not found.' });
    return null;
  }).catch(err => done(err, false));
}));

export default passport;
