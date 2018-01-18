// @flow

import argon2 from 'argon2';

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import models from '../models';

const { jwt_secret } = require('../config.json');

// flow-disable-next-line
const User = models.user;

export default (passport: any) => {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_secret,
  }, (jwt_payload, done) => {
    User.findById(jwt_payload.id).then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }).catch(err => done(err, false));
  }));

  passport.use(new LocalStrategy({
    usernameField: 'email',
    session: false,
  }, (email, password, done) => {
    User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (user) {
        argon2.verify(user.password, password).then((match) => {
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: 'Incorrect password.' });
          }
        }).catch(err => done(err, false));
      } else {
        done(null, false, { message: 'User not found.' });
      }
    }).catch(err => done(err, false));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    }).catch(err => done(err, false));
  });
};
