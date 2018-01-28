// @flow

import argon2 from 'argon2';

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import models from '../../models';

const { User } = models;

const { jwtSecret } = require('../../config.json');

export default (passport: any) => {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  }, (jwtPayload, done) => {
    console.log(jwtPayload);
    // User.findById(jwtPayload.id).then((user) => {
    //   if (user) {
    //     done(null, user);
    //   } else {
    //     done(null, false);
    //   }
    // }).catch(err => done(err, false));
  }));

  passport.use(new LocalStrategy({
    usernameField: 'email',
    session: false,
  }, (email, password, done) => {
    User.query('email').eq(email).exec((err, user) => {
      if (user.count > 0) {
        argon2.verify(user[0].password, password).then((match) => {
          if (match) {
            done(null, user[0]);
          } else {
            done(null, false, { message: 'Incorrect password.' });
          }
        }).catch(hashErr => done(hashErr, false));
      } else {
        done(null, false, { message: 'Email address not found.' });
      }
    }).catch(err => done(err, false));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log(id);
    // User.findById(id).then((user) => {
    //   done(null, user);
    // }).catch(err => done(err, false));
    done(null, {});
  });
};
