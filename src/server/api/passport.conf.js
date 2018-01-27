// @flow

import argon2 from 'argon2';

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../models/index';

const { jwtSecret } = require('../config.json');

// flow-disable-next-line
const User = db.userTable;

export default (passport: any) => {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  }, (jwtPayload, done) => {
    User.findById(jwtPayload.id).then((user) => {
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
    User.query('emailGlobalIndex').eq(email).then((user) => {
      if (user) {
        argon2.verify(user.password, password).then((match) => {
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: 'Incorrect password.' });
          }
        }).catch(err => done(err, false));
      } else {
        done(null, false, { message: 'Email address not found.' });
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
