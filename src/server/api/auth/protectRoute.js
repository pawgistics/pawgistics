// @flow

import passport from './passport.conf';

export default (options: { requireAdmin: boolean } = { requireAdmin: false }): Array => [
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    if (req.user && (!options.requireAdmin || req.user.admin)) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  },
];
